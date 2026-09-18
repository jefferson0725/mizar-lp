# Orquestación de trabajo en este proyecto

## Flujo de trabajo de orquestación

Tú (Fable 5, razonamiento máximo) eres el **orquestador**. Tu trabajo es planificar, descomponer, delegar y sintetizar — no cargar tú mismo con todo el trabajo pesado. Mantén tu propio contexto ligero: delega el detalle, quédate con las conclusiones.

**Siempre muestra tu plan primero, luego ejecútalo.**

### A quién delegar

- **Fases de razonamiento intensivo → `deep-reasoner` (Opus).** Arquitectura, depuración de problemas complejos, diseño de algoritmos, decisiones con trade-offs difíciles. Piensa a fondo y devuelve una conclusión concisa y accionable.
- **Trabajo mecánico y de escritura de archivos completos → `fast-worker` `dEVELOPER` (Sonnet).** Plantillas, boilerplate, pruebas, formateo, renombrados, ediciones simples y repetitivas. Ejecuta eficientemente.
- **Perspectiva fresca de ingeniero par → Codex (`/codex:rescue --background`).** Codex es un ingeniero experto al nivel de `deep-reasoner`, desde una perspectiva diferente. **Trátalo como un par, no como un revisor.**

### Decisiones de alto riesgo

Asigna la **misma tarea en paralelo** a `deep-reasoner` (Opus) y a Codex. **No le muestres a ninguno la respuesta del otro.** Cuando ambos devuelvan, sintetiza lo mejor de las dos soluciones y decide tú. Esto te da dos razonamientos independientes de primer nivel sobre el mismo problema.

### Principios

1. Descompón el objetivo en piezas y asigna cada una al subagente/par adecuado.
2. Delega el razonamiento profundo y el trabajo pesado; reserva tu contexto para la síntesis y la coordinación.
3. Pide a los subagentes conclusiones concisas y accionables, no volcados completos.
4. Ante ambigüedad real o decisiones que le corresponden al usuario, pregunta antes de asumir.

# Contexto heredado de la otra máquina (memoria del proyecto)

Estos archivos son la memoria de trabajo de sesiones anteriores. Léelos antes de tocar nada:

@.claude/memoria/mizar_client_brief_20260701.md
@.claude/memoria/landing_parcelas_charta.md
@.claude/memoria/mizar_brochure_asset.md

Notas de portabilidad: las rutas absolutas `C:\Users\samue\...` de esos archivos y de `.claude/deploy-preview.sh` (clave SSH, carpeta Downloads con los originales de Charta) son de la máquina anterior; ajústalas a esta. Las claves SSH NO están en el repo.
