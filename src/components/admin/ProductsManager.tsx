"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, X, Package, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { Product } from "@/lib/db/types";

export default function ProductsManager({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for New Product
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceDollars, setPriceDollars] = useState("28.00");
  const [category, setCategory] = useState<Product["category"]>("aftercare");
  const [inventoryCount, setInventoryCount] = useState(15);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
  );
  const [sku, setSku] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const priceCents = Math.round(parseFloat(priceDollars) * 100);
      const categoryLabels: Record<string, string> = {
        aftercare: "Lash Aftercare",
        tools: "Beauty Tools",
        brows: "Brow Cosmetics",
        skincare: "Skincare",
      };

      const res = await fetch("/api/admin/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          subtitle,
          description,
          priceCents,
          category,
          categoryLabel: categoryLabels[category] || "Boutique",
          inventoryCount,
          imageUrl,
          sku: sku || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add product");
      }

      setProducts((prev) => [data.product, ...prev]);
      setShowAddModal(false);
      // Reset form
      setName("");
      setSubtitle("");
      setDescription("");
      setPriceDollars("28.00");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    const res = await fetch("/api/admin/products/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isPublished: !current }),
    });

    if (res.ok) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isPublished: !current } : p))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between p-4 bg-ivory border border-stone-hairline">
        <span className="text-xs text-mauve-dusty font-sans">
          {products.length} Products in Boutique Catalog
        </span>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-espresso text-porcelain text-xs uppercase tracking-wider font-medium hover:bg-espresso-light transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-rose-soft" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Product List */}
      <div className="bg-ivory/60 border border-stone-hairline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-ivory border-b border-stone-hairline text-mauve-dusty uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-hairline/60 bg-porcelain">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-ivory/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-porcelain border border-stone-hairline flex-shrink-0 overflow-hidden">
                        <Image
                          src={p.imageUrl}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <strong className="font-serif text-base text-espresso font-medium block">
                          {p.name}
                        </strong>
                        <span className="text-mauve-dusty text-[11px] block">
                          {p.subtitle}
                        </span>
                        <span className="text-[10px] text-espresso-muted font-mono">
                          {p.sku || "NO-SKU"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 uppercase text-[10px] text-mauve-dusty font-semibold">
                    {p.categoryLabel}
                  </td>
                  <td className="p-4 font-serif text-sm text-espresso font-medium">
                    ${(p.priceCents / 100).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-medium font-sans ${
                        p.inventoryCount <= 5
                          ? "bg-amber-100 text-amber-900 font-semibold"
                          : "bg-emerald-100 text-emerald-900"
                      }`}
                    >
                      {p.inventoryCount} units
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] uppercase font-semibold tracking-wider ${
                        p.isPublished
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(p.id, p.isPublished)}
                      className="px-2.5 py-1 text-[10px] uppercase font-medium border border-stone-hairline hover:border-espresso transition-colors text-espresso"
                    >
                      {p.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="relative max-w-lg w-full bg-porcelain border border-stone-hairline p-6 sm:p-8 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-stone-hairline pb-3">
              <h2 className="font-serif text-2xl text-espresso font-medium">
                Create Aftercare Product
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-espresso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="block text-espresso font-medium">Product Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Pure Keratin Lash Serum"
                  className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-espresso font-medium">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-espresso font-medium">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  >
                    <option value="aftercare">Lash Aftercare</option>
                    <option value="tools">Tools &amp; Accessories</option>
                    <option value="brows">Brow Cosmetics</option>
                    <option value="skincare">Skincare</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-espresso font-medium">Subtitle / Specs *</label>
                <input
                  type="text"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Physician-Formulated · 50ml"
                  className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-espresso font-medium">Price ($ USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={priceDollars}
                    onChange={(e) => setPriceDollars(e.target.value)}
                    className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-espresso font-medium">Initial Stock *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={inventoryCount}
                    onChange={(e) => setInventoryCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-espresso font-medium">SKU (Optional)</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="FH-SERUM"
                    className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-espresso font-medium">Image URL *</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-espresso font-medium">Product Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-ivory border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-hairline text-espresso"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-espresso text-porcelain font-medium hover:bg-espresso-light"
                >
                  {isSubmitting ? "Creating..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
