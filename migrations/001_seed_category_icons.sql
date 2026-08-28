-- Seeds sw.categories.icon with Bootstrap Icons class names.
-- Issue #1's description assumed these were already seeded; they were not
-- (all 10 rows have icon = NULL). Names follow design/Icones categories.dc.html's
-- confirmed set where the category matches; "restaurants" uses "cup-hot" (the
-- design's own general-ledger placeholder data uses it for a dinner expense)
-- since "plate-cutlery" from that file is a custom hand-drawn glyph, not a
-- real Bootstrap Icons name.
--
-- Run manually in the Supabase SQL Editor for project dneudwadlfafwcmbaimm.

update sw.categories set icon = 'basket'      where slug = 'supermercat';
update sw.categories set icon = 'cup-hot'     where slug = 'restaurants';
update sw.categories set icon = 'car-front'   where slug = 'transport';
update sw.categories set icon = 'controller'  where slug = 'lleure';
update sw.categories set icon = 'house-heart' where slug = 'llar';
update sw.categories set icon = 'balloon'     where slug = 'canguratge';
update sw.categories set icon = 'heart-pulse' where slug = 'mediques';
update sw.categories set icon = 'gift'        where slug = 'regals';
update sw.categories set icon = 'airplane'    where slug = 'viatges';
update sw.categories set icon = 'receipt'     where slug = 'altres';
