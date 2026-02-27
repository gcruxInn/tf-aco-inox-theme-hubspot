#!/bin/bash
# ================================================================
# MAPE-K: Monitor & Execute Loop (S.O. Agêntico TFAHUB251)
# V3.0: Robust Hands-Free — Zero-Click Execution & Log Vision
# ================================================================
# Changelog:
#   V2.4 → V3.0:
#     - Removido pipe stdin (echo "exit") — causava abort prematuro.
#     - Adicionado --dangerously-skip-permissions para zero-click.
#     - Adicionado --print para output direto (sem REPL interativo).
#     - Log estruturado com timestamps e exit codes.
#     - Graceful error handling com retry awareness.
# ================================================================

set -euo pipefail

# ── Paths ──────────────────────────────────────────────────────
TARGET_FILE=".agents/handoff/EXECUTION_ORDER.md"
LOG_DIR=".agents/ai_brain"
LOG_FILE="${LOG_DIR}/last_execution.log"
HISTORY_DIR="${LOG_DIR}/execution_history"

# ── Ensure directories ─────────────────────────────────────────
mkdir -p "$LOG_DIR" "$HISTORY_DIR"

# ── Banner ─────────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🔩  JARVIS V3.0 — Agentic OS (MAPE-K Loop)           ║"
echo "║  📂  Target: $TARGET_FILE       ║"
echo "║  📝  Log:    $LOG_FILE                  ║"
echo "║  🔧  Mode:   Zero-Click (--dangerously-skip-permissions)║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

LAST_MOD=$(stat -c %Y "$TARGET_FILE" 2>/dev/null || echo 0)
CYCLE=0

while true; do
    sleep 2
    CURRENT_MOD=$(stat -c %Y "$TARGET_FILE" 2>/dev/null || echo 0)

    if [ "$CURRENT_MOD" != "$LAST_MOD" ]; then
        LAST_MOD=$CURRENT_MOD
        CYCLE=$((CYCLE + 1))
        TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "🔔 [$TIMESTAMP] CYCLE #$CYCLE — Evento detectado."
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

        # ── Parse metadata from EXECUTION_ORDER header ──────────
        ROLE=$(head -n 15 "$TARGET_FILE" | grep -oP '(?<=ROLE: ).*' | head -1 | tr -d '\r ' )
        MODEL_ALIAS=$(head -n 15 "$TARGET_FILE" | grep -oP '(?<=MODEL: ).*' | head -1 | tr -d '\r ' )

        # ── Model selection (Claude 4.x family) ────────────────
        if [ "$MODEL_ALIAS" == "haiku" ]; then
            SELECTED_MODEL="claude-haiku-4-5-20251001"
            echo "💡 [ECONOMY] Modelo: Haiku 4.5"
        elif [ "$MODEL_ALIAS" == "opus" ]; then
            SELECTED_MODEL="claude-opus-4-6"
            echo "🔥 [PREMIUM] Modelo: Opus 4.6"
        else
            SELECTED_MODEL="claude-sonnet-4-6"
            echo "🧠 [POWER] Modelo: Sonnet 4.6"
        fi

        # ── Default role fallback ──────────────────────────────
        if [ -z "$ROLE" ]; then ROLE="cto-front"; fi

        echo "👤 [ROLE] $ROLE"
        echo "📄 [ORDER] $(head -n 5 "$TARGET_FILE" | tail -1)"

        # ── Build system prompt files list ─────────────────────
        SYSTEM_PROMPTS=""
        SYSTEM_PROMPTS+=" --append-system-prompt-file .agents/rules/tfa-master-protocol.md"

        # Append role-specific rules if file exists
        if [ -f ".agents/rules/${ROLE}.md" ]; then
            SYSTEM_PROMPTS+=" --append-system-prompt-file .agents/rules/${ROLE}.md"
        else
            echo "⚠️  [WARN] Role file .agents/rules/${ROLE}.md not found. Using master only."
        fi

        # Append all skills
        for skill_dir in .agents/skills/*/; do
            skill_file="${skill_dir}SKILL.md"
            if [ -f "$skill_file" ]; then
                SYSTEM_PROMPTS+=" --append-system-prompt-file $skill_file"
            fi
        done

        # ── Write log header ───────────────────────────────────
        {
            echo "════════════════════════════════════════════════════"
            echo "  JARVIS V3.0 — EXECUTION LOG"
            echo "  Timestamp: $TIMESTAMP"
            echo "  Cycle:     #$CYCLE"
            echo "  Role:      $ROLE"
            echo "  Model:     $SELECTED_MODEL ($MODEL_ALIAS)"
            echo "════════════════════════════════════════════════════"
            echo ""
        } > "$LOG_FILE"

        echo "🚀 [EXECUTION] Despachando Claude (Zero-Click)..."

        # ── Execute Claude in NON-INTERACTIVE print mode ───────
        # --print: Outputs response directly, no REPL session.
        # --dangerously-skip-permissions: Bypasses all y/n prompts.
        # This is the key fix: Claude runs, executes, and exits.
        eval claude --print \
               --model "$SELECTED_MODEL" \
               --dangerously-skip-permissions \
               $SYSTEM_PROMPTS \
               "\"EDA Trigger: Leia o arquivo $TARGET_FILE e execute TODAS as instruções descritas. Ao finalizar, reporte um resumo técnico do que foi feito.\"" \
               2>&1 | tee -a "$LOG_FILE"

        EXIT_CODE=${PIPESTATUS[0]}

        # ── Post-execution status ──────────────────────────────
        FINISH_TIME=$(date '+%Y-%m-%d %H:%M:%S')

        if [ "$EXIT_CODE" -eq 0 ]; then
            STATUS="✅ SUCCESS"
            echo ""
            echo "$STATUS [$FINISH_TIME] Cycle #$CYCLE concluído com exit code 0."
        else
            STATUS="❌ ERROR (exit code: $EXIT_CODE)"
            echo ""
            echo "$STATUS [$FINISH_TIME] Cycle #$CYCLE falhou."
        fi

        # ── Append footer to log ───────────────────────────────
        {
            echo ""
            echo "════════════════════════════════════════════════════"
            echo "  STATUS: $STATUS"
            echo "  Finished: $FINISH_TIME"
            echo "  Exit Code: $EXIT_CODE"
            echo "════════════════════════════════════════════════════"
        } >> "$LOG_FILE"

        # ── Archive log for history ────────────────────────────
        ARCHIVE_NAME="execution_${TIMESTAMP// /_}.log"
        ARCHIVE_NAME="${ARCHIVE_NAME//:/-}"
        cp "$LOG_FILE" "${HISTORY_DIR}/${ARCHIVE_NAME}" 2>/dev/null || true

        echo "📦 [ARCHIVE] Log salvo em: ${HISTORY_DIR}/${ARCHIVE_NAME}"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "📡 [MONITOR] Em vigília... (Ctrl+C para encerrar)"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

        LAST_MOD=$(stat -c %Y "$TARGET_FILE" 2>/dev/null || echo 0)
    fi
done
