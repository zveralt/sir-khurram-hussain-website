# Project context

## Purpose

Public marketing site and storefront shell for **Sir Khurram Hussain · Academic Studio**, with learner access designed to flow through **Aark Academy Learn360** (`aark-academy.learn360lms.com`). Developed by **Istiqeme Technologies**.

## Verified public positioning

- **SKH Solutions** (O/A Level coaching, Karachi): [skh.com.pk](https://www.skh.com.pk/)
- **Sir Khurram** appears on SKH’s public faculty materials under **Islamiyat** (long-form experience published on the marketing site).
- **Books & notes index** (Islamic Studies companions): [skh.com.pk/booksnotes](https://www.skh.com.pk/booksnotes/)
- **Teaching philosophy quote** (secondary source, full interview): [Times of Youth](https://timesofyouth.com/exclusive-interview-of-khurram-hussain/)

Editorial research notes: `SIR_KHURRAM_PROFILE.md`.

## Integration stance

- **LMS is source of truth** for learners, commerce, and private data.
- This repository implements catalogue **fixtures** until catalogue endpoints are connected.
- **No credentials** belong in git — use environment variables on the host.

## Contact routing

- **SKH admissions** (campus / Karachi): phone and email published on SKH (`contact@skh.com.pk`, `+92 335 7647647`).
- **Digital inquiries**: `POST /api/enquiry` — optional webhook via `ENQUIRY_WEBHOOK_URL`.
