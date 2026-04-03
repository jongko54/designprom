type HordeGenerateResponse = {
  id: string;
  kudos?: number;
  message?: string;
};

type HordeCheckResponse = {
  done: boolean;
  faulted: boolean;
  finished: number;
  is_possible: boolean;
  kudos: number;
  processing: number;
  queue_position: number;
  restarted: number;
  wait_time: number;
  waiting: number;
};

type HordeStatusGeneration = {
  censored: boolean;
  id: string;
  img: string;
  model: string;
  seed: string;
  state: string;
  worker_id: string;
  worker_name: string;
};

type HordeStatusResponse = HordeCheckResponse & {
  generations?: HordeStatusGeneration[];
  shared?: boolean;
};

const AI_HORDE_BASE_URL = "https://aihorde.net/api";
const AI_HORDE_API_KEY = process.env.AI_HORDE_API_KEY ?? "0000000000";
const AI_HORDE_CLIENT_AGENT =
  process.env.AI_HORDE_CLIENT_AGENT ?? "designprom/0.1";
const DEFAULT_MODEL = "AlbedoBase XL (SDXL)";
const DEFAULT_WIDTH = 832;
const DEFAULT_HEIGHT = 512;

type RoughDraftConfig = {
  height?: number;
  model?: string;
  width?: number;
};

async function hordeRequest<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${AI_HORDE_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: AI_HORDE_API_KEY,
      "Client-Agent": AI_HORDE_CLIENT_AGENT,
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  const payload = (await response.json()) as T & {
    errors?: Record<string, string>;
    message?: string;
  };

  if (!response.ok) {
    const errorText =
      payload.message ??
      (payload.errors ? Object.values(payload.errors).join(", ") : undefined) ??
      "AI Horde request failed";

    throw new Error(errorText);
  }

  return payload;
}

export async function generateHordeRoughDraft(
  prompt: string,
  config: RoughDraftConfig = {}
) {
  const width = config.width ?? DEFAULT_WIDTH;
  const height = config.height ?? DEFAULT_HEIGHT;
  const model = config.model ?? DEFAULT_MODEL;

  return hordeRequest<HordeGenerateResponse>("/v2/generate/async", {
    body: JSON.stringify({
      prompt,
      nsfw: false,
      censor_nsfw: true,
      trusted_workers: false,
      validated_backends: true,
      slow_workers: true,
      extra_slow_workers: false,
      replacement_filter: true,
      r2: true,
      shared: true,
      params: {
        n: 1,
        width,
        height,
        steps: 18
      },
      models: [model]
    }),
    method: "POST"
  });
}

export async function checkHordeRoughDraft(id: string) {
  return hordeRequest<HordeCheckResponse>(`/v2/generate/check/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function getHordeRoughDraftStatus(id: string) {
  return hordeRequest<HordeStatusResponse>(`/v2/generate/status/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
