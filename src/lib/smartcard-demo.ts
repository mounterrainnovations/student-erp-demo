/** In-memory + sessionStorage bridge for smart-card demo flow (client only). */
const KEY = "erp-demo-smartcard-v1";

export type SmartcardDemoState = {
  active: boolean;
  activatedAt?: string;
  dataFileAt?: string;
  cardNo?: string;
};

export function getSmartcardState(): SmartcardDemoState {
  if (typeof window === "undefined") return { active: false };
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return { active: false };
    return JSON.parse(raw) as SmartcardDemoState;
  } catch {
    return { active: false };
  }
}

export function setSmartcardState(next: SmartcardDemoState) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(next));
}

export function activateSmartcard(): SmartcardDemoState {
  const cardNo = `BU-SC-2026-${String(Math.floor(10000 + Math.random() * 90000))}`;
  const state: SmartcardDemoState = {
    active: true,
    activatedAt: new Date().toISOString(),
    cardNo,
  };
  setSmartcardState(state);
  return state;
}

export function markDataFileGenerated(): SmartcardDemoState {
  const prev = getSmartcardState();
  const state: SmartcardDemoState = {
    ...prev,
    dataFileAt: new Date().toISOString(),
  };
  setSmartcardState(state);
  return state;
}
