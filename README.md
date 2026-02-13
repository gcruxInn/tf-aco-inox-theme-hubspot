# TF Aço e Inox Theme (TFAHUB251)

> **Enterprise Grade HubSpot Theme**
> Modern, accessible, and structured for performance.

## 🏗 Project Structure
This theme follows a **flat, root-level structure** to avoid nesting issues and ensure clean path resolution.

```plaintext
TFAHUB251/
├── css/                # Global CSS (Variables, Typography, Mixins)
├── layouts/            # Base templates (base.hubl.html)
├── modules/            # Custom Modules (Hero, Services, etc.)
├── partials/           # Global Partials (Header, Footer)
├── templates/          # Page Templates (Home, About, etc.)
├── theme.json          # Theme Configuration
└── fields.json         # Global Theme Settings
```

## ✨ Key Features

### 1. Enterprise Global Partials
Refactored for maximum flexibility, SEO, and Accessibility.

*   **Global Header (`partials/header.hubl.html`)**:
    *   **SEO**: Auto-injected JSON-LD `Organization` Schema.
    *   **Accessibility**: Full ARIA support (`role="banner"`, `role="navigation"`).
    *   **Drag-and-Drop Top Bar**: Dedicated zone for announcements/promotions.
    *   **Performance**: `loading="eager"` on critical assets (Logo).

*   **Global Footer (`partials/footer.hubl.html`)**:
    *   **Flexible Layout**: Fully Drag-and-Drop. Create 3-4 column layouts directly in the editor.
    *   **Semantic**: `role="contentinfo"`, `WPFooter` Schema.

### 2. Intelligent CSS Architecture
*   **Scoped Variables**: Theming handled via `theme-overrides.hubl.css`.
*   **Accessibility**: `prefers-reduced-motion` and high-contrast support.

## 🚀 Deployment

To deploy this theme to your HubSpot portal (Account ID: 50649402), run:

```bash
hs cms upload . TFAHUB251
```

> **Note**: Ensure the old `TF Master Theme HubSpot` folder is deleted from the Design Manager to prevent template duplication.

## 🛠 Local Development
1.  **Install CLI**: `npm install -g @hubspot/cli`
2.  **Auth**: `hs auth login`
3.  **Watch**: `hs cms watch . TFAHUB251`

---
*Built by InnLeaders Engineering*
