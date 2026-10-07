export const initialMessages = [
  {
    id: "msg-1",
    timestamp: "10:24 AM",
    problem: "Compare the architectural tradeoffs between Optimistic Concurrency Control (OCC) and Two-Phase Locking (2PL) for a high-throughput financial ledger service, including lock contention and rollback overhead under 90% read / 10% write workloads.",
    solution_1: `### Architectural Analysis: Optimistic Concurrency Control (OCC)

In a ledger engine with a **90% read / 10% write** distribution, **OCC** dramatically outperforms pessimistic locking by eliminating read-side lock coordination overhead.

#### Key Characteristics & Flow:
1. **Zero-Lock Reads:** Transactions read balances using snapshot isolation without acquiring shared locks (\`S-Lock\`).
2. **Atomic Validation Phase:** At commit time, the ledger verifies that read version timestamps match current journal state:
\`\`\`typescript
// Ledger validation check at commit phase
function validateAndCommit(tx: Transaction): boolean {
  if (currentAccountVersion === tx.readVersion) {
    appendJournalEntry(tx.entries);
    currentAccountVersion++;
    return true; // Fast path commit
  }
  return false; // Abort and trigger client retry
}
\`\`\`
3. **Contention Under 90/10 Split:** With only 10% writes randomly distributed across accounts, collision probability is low (<2%).

#### Advantages:
- Eliminates deadlock detection graphs and transaction starvation.
- Minimizes database latch wait latency (p99 tail latency drops significantly).
- Read throughput scales linearly with distributed read-replicas.`,
    solution_2: `### Architectural Analysis: Strict Two-Phase Locking (2PL)

**Two-Phase Locking (2PL)** enforces strict serializability by locking data items during expansion and holding locks until commit or abort.

#### Core Mechanics:
1. **Growing Phase:** Acquire exclusive locks (\`X-Lock\`) for writes and shared locks (\`S-Lock\`) for ledger balance lookups.
2. **Shrinking Phase:** Release all locks at transaction termination.

\`\`\`sql
-- Strict 2PL transaction isolation in SQL engine
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE account_id = 'A109' WITH (HOLDLOCK);
-- Blocks any concurrent write transactions until commit
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A109';
COMMIT TRANSACTION;
\`\`\`

#### Critical Tradeoffs for Ledger Workloads:
- **Lock Contention:** Even with 10% writes, shared ledger accounts (e.g. omnibus settlement accounts) become severe serialization bottlenecks.
- **Deadlock Detection Overhead:** High concurrent transaction volume forces the engine to run continuous wait-for-graph cycle detection (\`O(V + E)\`).
- **Predictability Guarantee:** Guarantees zero transaction abort cascades or client-side retry storms under sudden traffic spikes.`,
    judge: {
      solution_1_score: 9.4,
      solution_2_score: 8.8,
      solution_1_FeedBack: "Excellent architectural breakdown tailored to the 90/10 read-heavy scenario. Accurately highlighted how lockless validation avoids omnibus account contention and provides concrete TypeScript validation pseudo-code.",
      solution_2_FeedBack: "Clear explanation of 2PL locking phases and serializability guarantees. However, it understates the performance penalty on read-heavy ledgers where shared lock escalation severely degrades write commit latency.",
      recommendation: "OCC is strongly recommended for this workload. In a 90% read ledger, the negligible conflict rate makes OCC's zero-lock read path significantly superior to 2PL in both throughput and p99 latency."
    }
  }
];

export const quickPrompts = [
  "How should we handle idempotency keys in distributed payment APIs?",
  "Compare Redis cluster caching vs In-Memory LRU with CDC invalidation for microservices",
  "Design a rate limiter: Token Bucket vs Leaky Bucket for public REST endpoints",
  "PostgreSQL vs DynamoDB for high-volume audit logging and event sourcing"
];
