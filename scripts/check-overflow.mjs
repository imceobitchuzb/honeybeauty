const res = await fetch("http://localhost:9222/json");
const tabs = await res.json();
const page = tabs.find(t => t.type === "page" && t.url.includes("3001"));
if (!page) {
  console.log("No page tab found");
  process.exit(1);
}

const ws = new WebSocket(page.webSocketDebuggerUrl);

ws.onopen = () => {
  // Set device metric emulation for 390x844 mobile
  ws.send(JSON.stringify({
    id: 1,
    method: "Emulation.setDeviceMetricsOverride",
    params: {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    }
  }));

  setTimeout(() => {
    ws.send(JSON.stringify({
      id: 2,
      method: "Runtime.evaluate",
      params: {
        expression: `(() => {
          const w = window.innerWidth;
          const bad = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > w + 2) {
              bad.push({ tag: el.tagName, class: el.className, right: r.right, width: r.width });
            }
          });
          return { innerWidth: w, scrollWidth: document.documentElement.scrollWidth, badCount: bad.length, sample: bad.slice(0, 5) };
        })()`,
        returnByValue: true
      }
    }));
  }, 500);
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id === 2) {
    console.log("Evaluation result:", JSON.stringify(data.result.result.value, null, 2));

    // Capture screenshot
    ws.send(JSON.stringify({
      id: 3,
      method: "Page.captureScreenshot",
      params: { format: "png" }
    }));
  } else if (data.id === 3) {
    import("fs").then(fs => {
      fs.writeFileSync("screenshots/cdp-mobile-390.png", Buffer.from(data.result.data, "base64"));
      console.log("Saved screenshots/cdp-mobile-390.png!");
      process.exit(0);
    });
  }
};
