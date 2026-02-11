# Project Assets

Raw and processed assets for the TF Aço Inox brand.

## 📂 Structure

-   `raw/` (Do not upload to HubSpot) - High-res source files.
-   `dist/` (Ready for Upload) - WebP/Compressed versions.
-   `vectors/` - SVG icons and logos.

## ⚡ Triggers for Next Steps

### New Logo Version
> **Trigger**: "Marketing sends a new logo pack."
> **Action**:
> 1.  Place raw files in `raw/logos/`.
> 2.  Run optimization script (if available) or manually export to SVG.
> 3.  Update `TF_Aco_Inox_MasterTheme/modules/global_header` reference.

### Banner Refresh
> **Trigger**: "Black Friday Campaign."
> **Action**:
> 1.  Create `campaigns/black-friday-2026/` folder here.
> 2.  Ensure strict naming convention: `campaign-bf26-[element]-[size].webp`.
