"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Eye, CheckCircle2, Truck, MapPin, X } from "lucide-react";
import { Order } from "@/lib/db/types";

export default function OrdersManager({
  initialOrders,
}: {
  initialOrders: Order[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateFulfillment = async (
    id: string,
    fulfillmentStatus: Order["fulfillmentStatus"]
  ) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, fulfillmentStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, fulfillmentStatus } : o))
        );
        if (selectedOrder?.id === id) {
          setSelectedOrder((prev) =>
            prev ? { ...prev, fulfillmentStatus } : null
          );
        }
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="p-4 bg-ivory border border-stone-hairline flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-mauve-dusty absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, client name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-porcelain border border-stone-hairline text-xs text-espresso focus:outline-none"
          />
        </div>
        <span className="text-xs text-mauve-dusty font-sans">
          {orders.length} Total Orders
        </span>
      </div>

      {/* Table */}
      <div className="bg-ivory/60 border border-stone-hairline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-ivory border-b border-stone-hairline text-mauve-dusty uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Order # &amp; Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Delivery</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Fulfillment</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-hairline/60 bg-porcelain">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-espresso-muted">
                    No orders match your query.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-ivory/40">
                    <td className="p-4">
                      <strong className="text-espresso font-mono block">
                        {order.orderNumber}
                      </strong>
                      <span className="text-[10px] text-mauve-dusty">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-espresso font-medium block">
                        {order.customerName}
                      </span>
                      <span className="text-[11px] text-espresso-muted">
                        {order.customerEmail}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-[11px] text-espresso">
                        {order.shippingAddress.isStudioPickup ? (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-rose-muted" />
                            Studio Pickup
                          </>
                        ) : (
                          <>
                            <Truck className="w-3.5 h-3.5 text-rose-muted" />
                            Shipping
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-4 font-serif text-sm font-medium text-espresso">
                      ${(order.totalCents / 100).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] uppercase font-semibold">
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 text-[9px] uppercase font-semibold tracking-wider ${
                          order.fulfillmentStatus === "DELIVERED"
                            ? "bg-blue-100 text-blue-800"
                            : order.fulfillmentStatus === "READY_FOR_PICKUP"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {order.fulfillmentStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="px-2.5 py-1 border border-stone-hairline text-espresso text-[10px] uppercase tracking-wider hover:border-espresso font-medium"
                      >
                        View Order
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="max-w-lg w-full bg-porcelain border border-stone-hairline p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-stone-hairline pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-mauve-dusty font-semibold">
                  Order Details
                </span>
                <h3 className="font-serif text-2xl text-espresso font-medium">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-espresso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recipient */}
            <div className="p-4 bg-ivory/60 border border-stone-hairline text-xs font-sans space-y-1.5">
              <p>
                <strong>Client: </strong> {selectedOrder.customerName}
              </p>
              <p>
                <strong>Email: </strong> {selectedOrder.customerEmail}
              </p>
              <p>
                <strong>Phone: </strong> {selectedOrder.customerPhone}
              </p>
              <p>
                <strong>Delivery Mode: </strong>
                {selectedOrder.shippingAddress.isStudioPickup
                  ? "In-Studio Pickup at Loft 28"
                  : `Shipping to ${selectedOrder.shippingAddress.street}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state}`}
              </p>
            </div>

            {/* Line items */}
            <div className="space-y-2 text-xs font-sans">
              <h4 className="font-serif text-base text-espresso font-medium border-b border-stone-hairline pb-1">
                Items ({selectedOrder.items.length})
              </h4>
              <div className="divide-y divide-stone-hairline/60">
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="py-2 flex justify-between">
                    <div>
                      <p className="font-medium text-espresso">{it.name}</p>
                      <p className="text-[11px] text-mauve-dusty">
                        Qty: {it.quantity} &times; ${(it.priceCents / 100).toFixed(2)}
                      </p>
                    </div>
                    <span className="font-serif text-espresso">
                      ${((it.priceCents * it.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-hairline pt-2 space-y-1 text-espresso/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(selectedOrder.subtotalCents / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (AZ)</span>
                  <span>${(selectedOrder.taxCents / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {selectedOrder.shippingCents === 0
                      ? "FREE"
                      : `$${(selectedOrder.shippingCents / 100).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-espresso text-sm pt-1 border-t border-stone-hairline">
                  <span>Total</span>
                  <span className="font-serif text-base">
                    ${(selectedOrder.totalCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Fulfillment Action */}
            <div className="space-y-2 pt-2 border-t border-stone-hairline text-xs font-sans">
              <label className="block text-espresso font-medium">Update Fulfillment</label>
              <div className="flex flex-wrap gap-2">
                {(["UNFULFILLED", "READY_FOR_PICKUP", "SHIPPED", "DELIVERED"] as const).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={isUpdating || selectedOrder.fulfillmentStatus === st}
                      onClick={() => handleUpdateFulfillment(selectedOrder.id, st)}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium border transition-colors ${
                        selectedOrder.fulfillmentStatus === st
                          ? "bg-espresso text-white border-espresso"
                          : "bg-porcelain border-stone-hairline text-espresso hover:border-espresso"
                      }`}
                    >
                      {st.replace(/_/g, " ")}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
