# xH all in one - Commercial Release Notes

## Current stable release

- Release date: 2026-06-30
- Extension version: 2.1.12
- Web commit: 591e50d - Use LOC page scanner endpoints
- Rollback tag: backup-pages-scanner-20260630
- Package folder: releases/2026-06-30-commercial

## What is included

- Chrome/Coc Coc unpacked extension in `releases/2026-06-30-commercial/extension`
- Customer zip package in `releases/2026-06-30-commercial/xh-all-in-one-commercial-2.1.12-20260630.zip`
- Web app source is kept in the repository root: `index.html`, `src`, `libs`, `assets`
- Extension source is kept in `extension-source`

## Stable modules verified before packaging

- Loc ban be
- Bai viet
- Dang theo doi
- Tin nhan
- Nhom
- Loi moi ket ban
- Trang

## Customer install guide

1. Extract `xh-all-in-one-commercial-2.1.12-20260630.zip`.
2. Open Chrome or Coc Coc and go to `chrome://extensions`.
3. Turn on Developer mode.
4. Click Load unpacked.
5. Select the extracted `extension` folder.
6. Open `https://nxh1811.github.io/` and hard reload once.

## Rollback

If a future build breaks, restore from:

```bash
git checkout backup-pages-scanner-20260630
```

Or restore the customer package from:

```text
releases/2026-06-30-commercial/xh-all-in-one-commercial-2.1.12-20260630.zip
```

## Notes

- Do not delete `extension-source`; it is the editable extension package.
- Do not package the full repository for customers. Send only the release zip.
- `_metadata` is kept only as unpacked-source reference and is not included in the customer package.
