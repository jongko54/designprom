"use client";

import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type WheelEvent
} from "react";

import { PromptShowcaseScene } from "@/components/three/prompt-showcase-scene";
import {
  promptShowcaseEntries,
  type PromptShowcaseSceneKind
} from "@/components/three/prompt-showcase-presets";

import styles from "./immersive-prompt-showcase.module.css";

type ImmersivePromptShowcaseProps = {
  initialScene?: PromptShowcaseSceneKind;
  routeLabel?: string;
};

export function ImmersivePromptShowcase({
  initialScene = "monolith-drift",
  routeLabel = "showcase"
}: ImmersivePromptShowcaseProps) {
  const initialIndex = Math.max(
    0,
    promptShowcaseEntries.findIndex((entry) => entry.id === initialScene)
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const lastWheelAt = useRef(0);
  const activeEntry = useMemo(
    () => promptShowcaseEntries[activeIndex] ?? promptShowcaseEntries[0],
    [activeIndex]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectScene = (nextIndex: number) => {
    startTransition(() => {
      setActiveIndex(nextIndex);
    });
  };

  const cycleScene = (direction: number) => {
    selectScene((activeIndex + direction + promptShowcaseEntries.length) % promptShowcaseEntries.length);
  };

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    const now = Date.now();

    if (now - lastWheelAt.current < 520 || Math.abs(event.deltaY) < 18) {
      return;
    }

    lastWheelAt.current = now;
    event.preventDefault();
    cycleScene(event.deltaY > 0 ? 1 : -1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      cycleScene(1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      cycleScene(-1);
    }
  };

  const shellStyle = {
    "--showcase-accent": activeEntry.palette.accent,
    "--showcase-accent-soft": activeEntry.palette.accentSoft,
    "--showcase-card": activeEntry.palette.card,
    "--showcase-line": activeEntry.palette.line
  } as CSSProperties;

  return (
    <main className={styles.page}>
      <section
        className={styles.shell}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        style={shellStyle}
        tabIndex={0}
      >
        <header className={styles.topline}>
          <Link className={styles.brand} href="/" prefetch={false}>
            designprom
          </Link>
          <div className={styles.toplineMeta}>
            <span>{routeLabel}</span>
            <span>
              {activeEntry.index} / {promptShowcaseEntries.length.toString().padStart(2, "0")}
            </span>
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.stageColumn}>
            <div className={styles.stage}>
              <div className={styles.stageCanvas} aria-label="Interactive 3D prompt showcase">
                {mounted ? (
                  <Canvas
                    camera={{ fov: 34, position: [0, 0.28, 6.2] }}
                    dpr={[1, 1.8]}
                    gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
                    shadows
                  >
                    <PromptShowcaseScene entry={activeEntry} key={activeEntry.id} />
                  </Canvas>
                ) : (
                  <div className={styles.placeholder} aria-hidden="true">
                    <span className={styles.placeholderCore} />
                  </div>
                )}
              </div>
              <div className={styles.stageFrame} />
              <div className={styles.stageGlow} />
              <div className={styles.stageIndex}>{activeEntry.index}</div>
              <div className={styles.stageMeta}>
                <div className={styles.stageMetaTopline}>
                  <span>{routeLabel}</span>
                  <span>{activeEntry.stageLabel}</span>
                </div>
                <h1 className={styles.stageTitle}>{activeEntry.title}</h1>
              </div>
            </div>
          </div>

          <div className={styles.promptDeck}>
            {promptShowcaseEntries.map((entry, index) => (
              <button
                className={index === activeIndex ? `${styles.promptCard} ${styles.promptCardActive}` : styles.promptCard}
                key={entry.id}
                onClick={() => selectScene(index)}
                type="button"
              >
                <div className={styles.promptCardHead}>
                  <span className={styles.promptIndex}>{entry.index}</span>
                  <span className={styles.promptStage}>{entry.stageLabel}</span>
                </div>
                <h2 className={styles.promptTitle}>{entry.title}</h2>
                <p className={styles.promptText}>{entry.prompt}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
