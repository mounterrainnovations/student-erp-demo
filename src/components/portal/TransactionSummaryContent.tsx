"use client";

import React, { useState } from "react";
import { Download, Search, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function TransactionSummaryContent() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const transactions = [
    { id: "TXN-893421", date: "15 Apr 2026", purpose: "Semester VI Fee", amount: 45000, status: "Success", method: "Net Banking" },
    { id: "TXN-891044", date: "02 Mar 2026", purpose: "Library Fine", amount: 150, status: "Success", method: "UPI" },
    { id: "TXN-880922", date: "10 Feb 2026", purpose: "Challenge Valuation Fee", amount: 2000, status: "Failed", method: "Credit Card" },
    { id: "TXN-880925", date: "10 Feb 2026", purpose: "Challenge Valuation Fee", amount: 2000, status: "Success", method: "Debit Card" },
    { id: "TXN-764312", date: "05 Nov 2025", purpose: "Semester V Fee", amount: 45000, status: "Success", method: "Net Banking" },
  ];

  const filteredData = transactions.filter(t => 
    t.purpose.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", color: "#1a1a2e", marginBottom: 8, fontWeight: 700 }}>Transaction Summary</h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
            View your complete history of payments and financial transactions.
          </p>
        </div>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#fff",
            color: "#007B8A",
            border: "1px solid #007B8A",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.875rem"
          }}
        >
          <Download size={16} /> Download Statement
        </button>
      </div>

      {/* Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: "0.8125rem", color: "#6b7280", marginBottom: 8 }}>Total Paid (This Year)</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e" }}>₹47,150</div>
        </div>
        <div style={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: "0.8125rem", color: "#6b7280", marginBottom: 8 }}>Pending Dues</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a7a4a" }}>₹0</div>
        </div>
        <div style={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: "0.8125rem", color: "#6b7280", marginBottom: 8 }}>Last Transaction</div>
          <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1a1a2e" }}>15 Apr 2026</div>
          <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: 2 }}>Semester VI Fee</div>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #e0e0e0", backgroundColor: "#fcfcfc" }}>
          <div style={{ position: "relative", maxWidth: 300 }}>
            <Search size={16} color="#9ca3af" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="text" 
              placeholder="Search by ID or purpose..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }}>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Date & ID</th>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Purpose</th>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Payment Method</th>
              <th style={{ padding: "14px 16px", textAlign: "right", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Amount</th>
              <th style={{ padding: "14px 16px", textAlign: "center", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "14px 16px", textAlign: "center", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((txn, i) => (
                <tr key={i} style={{ borderBottom: i === filteredData.length - 1 ? "none" : "1px solid #f3f4f6", backgroundColor: txn.status === "Failed" ? "#fffafa" : "#fff" }}>
                  <td style={{ padding: "16px", verticalAlign: "top" }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1a1a2e" }}>{txn.date}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: 4, fontFamily: "monospace" }}>{txn.id}</div>
                  </td>
                  <td style={{ padding: "16px", verticalAlign: "top" }}>
                    <div style={{ fontSize: "0.875rem", color: "#374151", fontWeight: 500 }}>{txn.purpose}</div>
                  </td>
                  <td style={{ padding: "16px", verticalAlign: "top" }}>
                    <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>{txn.method}</div>
                  </td>
                  <td style={{ padding: "16px", verticalAlign: "top", textAlign: "right" }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1a1a2e" }}>₹{txn.amount.toLocaleString()}</div>
                  </td>
                  <td style={{ padding: "16px", verticalAlign: "top", textAlign: "center" }}>
                    {txn.status === "Success" ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, backgroundColor: "#d4f5e9", color: "#1a7a4a", fontSize: "0.75rem", fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>
                        <CheckCircle2 size={12} /> Success
                      </span>
                    ) : (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, backgroundColor: "#fee2e2", color: "#dc2626", fontSize: "0.75rem", fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>
                        <XCircle size={12} /> Failed
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "16px", verticalAlign: "top", textAlign: "center" }}>
                    {txn.status === "Success" ? (
                      <button style={{ background: "none", border: "none", color: "#007B8A", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 600 }}>
                        Receipt
                      </button>
                    ) : (
                      <button style={{ background: "none", border: "none", color: "#9ca3af", cursor: "not-allowed", fontSize: "0.8125rem", fontWeight: 600 }} disabled>
                        -
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: "40px 16px", textAlign: "center", color: "#6b7280", fontSize: "0.875rem" }}>
                  No transactions found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
