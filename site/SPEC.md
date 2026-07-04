# SPEC — Sitio Grupo Mizar (V1)

Sitio corporativo de Grupo Mizar: inmobiliaria/constructora santandereana, +20 años, +100 proyectos entregados. Modelo: **propiedades a cuotas, directo con la constructora, sin bancos**. Público: trabajadores colombianos sin acceso a crédito bancario + colombianos en el exterior (USA/España) que quieren invertir en Colombia.

Stack: Astro 7 + Tailwind 4 (`@theme` en `src/styles/global.css`) + React islands solo donde hay interactividad real. Mobile-first SIEMPRE: diseña primero la vista móvil, `md:` en adelante para desktop.

## Sistema de diseño (OBLIGATORIO — leer src/styles/global.css)

- Paleta: `plum #3b1f3e` / `plum-dark #2a1630` (fondos oscuros), `mizar #e62e4d` (ÚNICO acento fuerte: CTAs, marca), `gold #d9a441` (acento fino: eyebrows, estados activos, subrayados — NUNCA fondos grandes), `cream #f6f3ee` (fondo claro), `ink #241a26` (texto), `teal #35565a` (secundario, overlays de foto).
- Tipografía: **Archivo Variable** única familia. Titulares con utilidad `display-xl`/`display-lg` (expandidos, peso 850). Eyebrows con `eyebrow`. Cifras grandes con `stat-num`. Texto corrido máx ~65ch (`max-w-prose`).
- Botones: `btn-primary` (rojo) y `btn-outline`. Esquinas 4px. **NO uses rounded-full en botones ni rounded-lg/xl/2xl en cards** — usa `rounded-[4px]` o `rounded-md` máximo; el lenguaje es arquitectónico, no blando.
- Layout: `container-site`. Secciones `py-16 md:py-24`. Alterna fondos cream / plum / blanco. **Asimetría editorial**: titulares alineados a la izquierda, grids descompensados (ej. 7/5), NO todo centrado.
- Fotos: overlay teal/plum sutil (`bg-teal/40` mix) como en mizar.com.co para unificar.

### Prohibido (patrones de IA — el cliente los detecta y los rechaza)
- Emoji como iconos o marcadores de sección.
- Gradientes violeta→azul, glassmorphism, sombras enormes.
- Todo centrado, cards idénticas con rounded-lg y sombritas.
- Marcadores numerados 01/02/03 salvo que sea una secuencia real (los pasos del modelo de pago SÍ lo son).
- Lorem ipsum: SIEMPRE copy real de este SPEC.
- Iconos: usa SVG inline simples (stroke 2, estilo Lucide) y pocos; nada de emoji.

## Convenciones

- Layout global: `src/layouts/Base.astro` — props `{ title, description, path, ogImage?, schema? }`. Ya incluye Header, Footer, WhatsAppFloat y JSON-LD de Organization. Úsalo en TODAS las páginas.
- Datos de proyectos: `src/data/proyectos.ts` — importa de ahí, NO dupliques datos.
- Imágenes locales: `astro:assets` con `<Image />` / `<Picture />` (widths responsive, format webp). Imágenes de proyectos en `src/assets/proyectos/` (giron.png, piedecuesta.png, lotes-cucuta.png). Foto equipo: `src/assets/equipo.jpg`. Proyectos sin imagen (`imagen: null`): placeholder plum con el nombre en display-lg y textura de líneas diagonales sutiles CSS (NO gradiente violeta).
- WhatsApp: números en `src/data/proyectos.ts`. Links `https://wa.me/<num>?text=<encodeURIComponent(mensaje)>` con `data-event="whatsapp-click"`.
- Formularios V1 sin backend: al enviar, construir mensaje y redirigir a WhatsApp con los datos. Marca `data-event="form-submit"`. (Se conectará a CRM después.)
- Títulos SEO: `<título específico> | Grupo Mizar`. Descriptions 150-160 chars, con keyword local.
- Español colombiano, tuteo. Tono: directo, humano, sin jerga financiera, sin promesas infladas.

## Copy oficial (usar textual)

**Tagline / propósito:** «Convertimos tu esfuerzo en propiedades, a cuotas y sin bancos»
**Secundario:** «Tu libertad empieza con una decisión segura.»
**Credenciales:** Más de 20 años construyendo en Colombia · +100 proyectos entregados · Santander y Norte de Santander.
**Modelo (Nosotros/Home):** «Cambiamos la deuda bancaria por algo más justo: pago directo, a cuotas, sin filas y trámites infinitos, codeudores, o cobros ocultos, sin intermediarios que se quedan con una tajada.»
**Dos marcas:** Mizar (apartamentos, cabañas y parcelas campestres) y Mi Lote (lotes urbanos en Cúcuta).

**Historia (página Nosotros, usar completa):**
«Empezamos construyendo para el país. Hace más de veinte años, un grupo de ingenieros santandereanos comenzó a levantar obras para el Estado: parques, centros de convenciones, espacios públicos. Uno de esos proyectos, el Parque Metropolitano Bosque Encantado en Bucaramanga, llegó hasta la Bienal Colombiana de Arquitectura. Otro nos llevó a la Sierra Nevada, a construir el Centro de Interpretación Arhuaca en Nabusimake. Ese no se podía hacer con planos estándar: había que escuchar a la comunidad, entender su cultura y construir a su medida. Adaptar el proyecto a la gente, y no la gente al proyecto, se volvió nuestra forma de trabajar. Con los años entregamos más de cien obras en distintas regiones de Colombia. Pero en el camino entendimos algo que cambió el rumbo. Había una barrera que dejaba a mucha gente por fuera: el banco, el puntaje de crédito, el reporte en la central de riesgo. Personas trabajadoras, con la disciplina y el esfuerzo para pagar, a las que el sistema les decía que no.»

**Equipo (tabla Nosotros):** Claudia Villamizar — Gerencia General · Nelson Villamizar — Dirección de Proyectos · Ingry Suárez — Dirección Jurídica · Juliana Parada — Arquitectura · María Paula Parada — Marketing Digital. Intro: «Grupo Mizar es una empresa familiar. Detrás de cada obra hay un equipo que responde con nombre propio por lo que construye.» Foto: `src/assets/equipo.jpg`.

**Mi Lote (landing /lotes-cucuta):** título «Tu lote propio, a cuotas, sin bancos». Gancho: «Llevas años trabajando duro, y no tienes nada a tu nombre. Hoy ese esfuerzo puede quedar en tierra propia, de forma segura.» LA URBANIZACIÓN MÁS GRANDE DE SAN CAYETANO. Junto al anillo vial occidental y a 100 metros de la futura Universidad Simón Bolívar. Incluye (sin letra pequeña): Lote de 7x10 o 7x16 metros · Escritura independiente: 100% legal, a tu nombre · Pago a cuotas sin intereses, sin bancos y sin intermediarios · Servicios públicos y vías garantizados (agua, luz, alcantarillado, pavimentación, andenes) · Zonas verdes · Diseño arquitectónico personalizado sin costo adicional · El respaldo del Grupo Mizar. «Entrar ahora es entrar a tiempo.» «Y si vives fuera del país, puedes invertir desde donde estés: te acompañamos en cada paso.» Oficinas maps: https://maps.app.goo.gl/jhAWKJDp7szhNFQs7 · WhatsApp Mi Lote: 573112382253.

**FAQ Mi Lote (usar textual, componente detalles/acordeón accesible con <details>):**
1. ¿Tengo que pasar por un banco o tener historial crediticio? — No. Pagas directamente a cuotas, sin intereses y sin bancos. No hay estudio de crédito ni hipoteca: por eso es accesible incluso si nunca has comprado tierra antes.
2. ¿Puedo comprar si vivo en el exterior? — Sí. Muchos de nuestros propietarios viven fuera de Colombia. Te acompañamos en todo el proceso y puedes avanzar desde donde estés.
3. ¿Qué puedo construir en el lote? — Lo que decidas: casa, local comercial o un edificio que te genere ingresos. El diseño arquitectónico se personaliza a la medida.
4. ¿En qué se diferencia Mi Lote de otras urbanizadoras? — En tres cosas que no se improvisan: escrituración independiente, diseño arquitectónico personalizado, y el respaldo de 20 años del Grupo Mizar.
5. ¿El proyecto es legal y está en regla? — Sí. Miravista es suelo urbano con escrituración independiente y servicios garantizados. Toda la documentación está en regla y la revisas antes de decidir.
6. ¿Y si en algún momento no puedo seguir pagando? — Conversamos contigo. No es un proceso bancario frío: trabajamos con procesos humanos y claros, pensados para acompañarte, no para presionarte.
7. ¿Dónde queda y cómo lo conozco? — En San Cayetano, Cúcuta, a pocos minutos del anillo vial occidental. Agenda una visita o una llamada con nuestro equipo.

**Contacto:** Formulario corto (máx 3-4 campos: nombre, país donde vives, tipo de proyecto de interés, celular) + WhatsApp + mapa embed (iframe Google Maps de Calle 105A #23a-18, Provenza, Bucaramanga; link https://maps.app.goo.gl/cjd7zaDX9qxuy5KW6).

**Proyectos index:** intro «Contamos con un portafolio de apartamentos sobre planos y terminados. ¿Quieres ver los terminados?» + CTA WhatsApp con mensaje «Hola, vengo de la web, ¿puedo ver los apartamentos terminados?».

## Rutas V1

| Ruta | Dueño | Contenido |
|---|---|---|
| `/` | worker-home | Hero form estilo Briones + stats + selector + testimonios + equipo + miniaturas proyectos |
| `/nosotros` | worker-paginas | Historia + modelo + equipo + propósito |
| `/contacto` | worker-paginas | Form + WhatsApp + mapa + dirección |
| `/proyectos` + `/proyectos/[slug]` | worker-proyectos | Index + fichas desde proyectos.ts |
| `/lotes-cucuta` | worker-proyectos | Landing Mi Lote completa (copy arriba) |
| Landings SEO: `/apartamentos-vis-giron`, `/apartamentos-vis-piedecuesta`, `/parcelas-campestres-santander`, `/inversion-inmobiliaria-colombia-exterior` | worker-proyectos | Landing corta real (hero + beneficios + proyecto relacionado + FAQ 3 items + CTA), NO thin content |
| `/blog` + `/blog/[slug]` | worker-blog | Collection `blog`, 3 posts seed, layout post con schema Article |
| `/admin` | worker-blog | Sveltia CMS (git-based) |

## Home (detalle para worker-home)

1. **Hero** (fondo plum-dark, foto proyecto con overlay teal): eyebrow dorado «CONSTRUCTORA · +20 AÑOS EN COLOMBIA», H1 display-xl «Convertimos tu esfuerzo en propiedades, a cuotas y sin bancos», stats en fila (20+ años · 100+ proyectos · Santander y N. de Santander, con stat-num). A la derecha (desktop) / debajo (móvil): **card de formulario estilo Grupo Briones** sobre panel plum translúcido: «¿Qué buscas?» radio Parcela/Apartamento/Lote · «¿Para qué?» radio Inversión/Vivienda propia · nombre · email · celular con select de país (CO +57, US +1, ES +34, otros) · botón rojo «Quiero más información» → wa.me con resumen. React island `HeroForm.jsx` (client:load).
2. **Selector de proyectos** («Encuentra tu proyecto»): island React `ProyectoSelector.jsx` (client:visible) — chips de filtro tipo (Apartamento/Parcela/Lote) y propósito; filtra las cards de proyectos.ts en vivo, cada card → su ruta.
3. **Testimonios**: carrusel horizontal scroll-snap (CSS, sin JS pesado) con 3-4 quotes placeholder marcadas TODO-video (los videos llegan de Drive después).
4. **Equipo** (foto equipo.jpg ancho completo con overlay): «Tu libertad empieza con una decisión segura.» + CTA /nosotros.
5. **Proyectos destacados**: 4-5 miniaturas desde proyectos.ts + CTA «Conoce nuestros proyectos» → /proyectos.
6. **CTA final** plum: «Da el primer paso» + botones WhatsApp y /contacto.

## SEO/GEO transversal

- Cada página: title + description únicos, canonical (lo hace Base.astro vía `path`).
- Schema extra por página vía prop `schema`: Article en posts, FAQPage donde haya FAQ, RealEstateListing en fichas de proyecto.
- Encabezados jerárquicos (un solo H1), alt descriptivos en español.
- Contenido citable por IAs: párrafos-respuesta directos de 40-60 palabras tras cada H2 (GEO).
