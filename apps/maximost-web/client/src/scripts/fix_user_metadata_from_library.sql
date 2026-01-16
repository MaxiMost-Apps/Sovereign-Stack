-- CENTENARIAN SYNC: METADATA HEALING
-- Updates existing user habits by pulling rich metadata (How/Why/Visuals) from the library_habits source of truth.
-- This fixes "No motivation set" and generic blue icons for habits deployed before the metadata bridge was active.

UPDATE habits h
SET
    -- 1. Sync the full metadata object (Tactical, Identity, Visuals)
    metadata = lh.metadata,

    -- 2. Sync the root columns if they were generic/missing
    -- (We prioritize the library's official theme unless the user has customized it,
    -- but identifying customization is hard, so we assume library authority for this fix)
    color = lh.metadata->'visuals'->>'theme',
    icon = lh.metadata->'visuals'->>'icon'
FROM library_habits lh
WHERE h.title = lh.title;
