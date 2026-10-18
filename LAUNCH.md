# Production Launch Checklist

Keep this checklist updated as items are verified before public launch.

- [ ] Custom domain (newdurgawirenettingworks.in) connected to Cloudflare Pages: add newdurgawirenettingworks.in, add www.newdurgawirenettingworks.in, and redirect www to apex with a 301
- [ ] Favicon and manifest verified in browser tab
- [ ] No "Made with" or builder tag or badge anywhere (view source and rendered page)
- [ ] Privacy Policy page and Terms and Conditions page live and linked in footer and form
- [ ] Certificate file added and opens correctly from /quality
- [ ] Certificate verified on www.isobv.in
- [ ] Company legal name and address match the certificate, GST and website
- [ ] Certification body accreditation status checked
- [ ] Relay assembly scope: ask certification body whether "Signalling Relay Assembly" can be added at the next surveillance audit (until then the relay assembly page makes no ISO claim)
- [ ] All TO CONFIRM values resolved (check-launch script passes)
- [ ] Web3Forms key set, test submission received at newdurgawire@gmail.com
- [ ] Real photos replaced where available, remaining generated images reviewed for defects
- [ ] Client logos used with permission confirmed
- [ ] Testimonials added only with written permission, or panel left empty
- [ ] Google Business Profile created and linked (optional)
- [ ] Legal review of Privacy Policy and Terms and Conditions by qualified counsel

## Pending Confirmation Values (TO CONFIRM Registry)

The following items have all been resolved and confirmed:
- [x] `legalName`: "New Durga Wire Netting Works"
- [x] `addressConfirmation` & `address`: "Sector 59-A, Industrial Area, Pithampur, Dist. Dhar, Madhya Pradesh 454775"
- [x] `workingHours`: "10:00 AM to 5:00 PM"
- [x] `whatsappNumber`: "+91 96300 89192"
- [x] `googleBusinessUrl`: Removed (set to null)
- [x] `web3formsKey`: `4240c512-9e09-4b3e-9a94-ff33c83e5848` configured in `.env` and `src/config/site.ts`

**All placeholders resolved. Production launch validation passes with zero errors.**
