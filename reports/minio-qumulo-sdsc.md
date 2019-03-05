# Minio+QF2 Test Results

SDSC provided an installation of the [Minio](https://minio.io/) object
storage server backed by 200 TB of [Qumulo](https://qumulo.com/) QF2 fast
storage (server `https://cdl.qs3.sdsc.edu:443`, bucket `cdl.sdsc.test`).

Tests were performed using [cos](https://github.com/dmolesUC3/cos), a
cloud object storage test tool developed in house, based on Amazon's 
[AWS SDK for Go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/).

## Summary

The SDSC Minio+QF2 system performed excellently and there appear to be no
barriers to adopting it as storage for Merritt.

### Table of Contents

- [Performance](#performance)
   - [Files per prefix](#files-per-prefix)
   - [Large files](#large-files)
- [Allowable filenames](#allowable-filenames)
   - [Ad-hoc file lists](#ad-hoc-file-lists)
   - [Unicode](#unicode)
      - [Unicode categories, properties, and scripts](#unicode-categories-properties-and-scripts)
      - [Emoji](#emoji)
      - [UTF8 invalid sequences](#utf8-invalid-sequences)

## Performance

### Files per prefix

Merritt stores files as objects using the key format
`<ark>|<version>|<file>`, where `<ark>` is of the form`ark:/<NAAN>/<name>`,
(`NAAN`: [Name Assigning Number
Authority](https://www.cdlib.org/uc3/naan_table.html)), `<version>` is a
positive integer, and `<file>` is a `/`-separated relative path from the
notional object root.

Many object storage systems, including those currently used by Merritt,
[Amazon S3](https://aws.amazon.com/s3/) and [OpenStack
Swift](https://docs.openstack.org/swift/latest/), despite storing objects
in a conceptually flat key space with no intrinisic hierarchy, support
filtering keys by a prefix and delimiter, giving the object store the
appearance of a directory structure. However, they generally do not support
filesystem-style wildcard filtering below that level.

With `/` as the delimiter, the Merritt key structure is not particularly
effective for filtering at the object level, as while the number of NAANs
found in Merritt ARKs is small, the number of objects for a given NAAN may
be large. Merritt has (currently) about 2.76 million objects, almost 99%
of which are under either the NAAN 13030 (CDL's own NAAN, comprising
about 1.44 million objects) or the NAAN 28722 (Berkeley's, comprising
about 1.28 million objects).

With Swift, we've seen performance issues with storing more than a few
thousand keys per prefix, requring us to divide Swift objects into multiple
buckets based on a partial hash of the object ARK. 

Historically, filesystems have had hard maximum numbers of files per
directory, or else have shown [significantly degraded
performance](https://trent.utfs.org/p/benchmarks/sid/2009-03-26/di-b.log.txt)
beyond a few thousand files. Given that Minio, despite presenting a
key-value object storage interface, is backed by a filesystem, we wanted to
make SDSC's Minio+QF2 storage it could handle these scenarios.

We tested up to ~1 million small files per prefix and found that the time
to create and retrieve a single file was effectively constant at about
370ms:

```
cos suite 's3://cdl.sdsc.test/' --endpoint  'https://cdl.qs3.sdsc.edu/' -v --count-only --count-max=1M

✅ 1. create 512 files under single prefix: successful (3m 17s)
first: 415ms, last: 341ms, fastest: 229ms, slowest: 467ms, median: 360ms
✅ 2. create 1024 files under single prefix: successful (6m 35s)
first: 146ms, last: 320ms, fastest: 146ms, slowest: 1s, median: 359ms
✅ 3. create 2048 files under single prefix: successful (13m 15s)
first: 139ms, last: 313ms, fastest: 139ms, slowest: 594ms, median: 362ms
✅ 4. create 4096 files under single prefix: successful (26m 50s)
first: 165ms, last: 358ms, fastest: 128ms, slowest: 1s, median: 365ms
✅ 5. create 8192 files under single prefix: successful (54m 46s)
first: 141ms, last: 353ms, fastest: 141ms, slowest: 1s, median: 374ms
✅ 6. create 16384 files under single prefix: successful (1h 49m 58s)
first: 143ms, last: 363ms, fastest: 143ms, slowest: 1s, median: 375ms
✅ 7. create 32768 files under single prefix: successful (3h 40m 58s)
first: 134ms, last: 417ms, fastest: 134ms, slowest: 1s, median: 375ms
✅ 8. create 65536 files under single prefix: successful (7h 22m 39s)
first: 138ms, last: 329ms, fastest: 138ms, slowest: 1s, median: 375ms
✅ 9. create 131072 files under single prefix: successful (14h 44m 6s)
first: 139ms, last: 275ms, fastest: 139ms, slowest: 1s, median: 375ms
✅ 10. create 262144 files under single prefix: successful (29h 50m 21s)
first: 139ms, last: 308ms, fastest: 139ms, slowest: 1s, median: 375ms
✅ 11. create 524288 files under single prefix: successful (59h 28m 38s)
first: 130ms, last: 351ms, fastest: 127ms, slowest: 1m 1s, median: 373ms
✅ 12. create 1048576 files under single prefix: successful (118h 53m 43s)
first: 165ms, last: 413ms, fastest: 147ms, slowest: 3s, median: 373ms
```

Delete time was not measured directly, but is included in the overall time
for each set and also appears to be effectively flat. 

The time to list a large number of files was not tested systematically, but
a spot check at around 290,000 files suggests that it does increase with the
number of files, to the point where it was necessary to configure the AWS
client never to time out while making the request. However, this is not an
operation used by Merritt.

### Large files

While 90% of files in Merritt are less than about 36 KiB in size, the
largest single file currently in Merritt is roughly 270 GiB, and large
deposits are only expected to grow in the future.

We found that while throughput to the Minio+QF2 system was variable, 
performance was in general very good, and even for large files was within
about a factor of two of Amazon S3 performance (roughly 10 hours to
create/retrieve/verify/delete a 1 TiB file).

```
cos suite 's3://cdl.sdsc.test/' --endpoint  'https://cdl.qs3.sdsc.edu/' -v --size-only --size-max=1T

✅ 1. create/retrieve/verify/delete 0B file: successful (112ms)
✅ 2. create/retrieve/verify/delete 1B file: successful (206ms)
✅ 3. create/retrieve/verify/delete 16B file: successful (254ms)
✅ 4. create/retrieve/verify/delete 256B file: successful (294ms)
✅ 5. create/retrieve/verify/delete 1K file: successful (320ms)
✅ 6. create/retrieve/verify/delete 16K file: successful (292ms)
✅ 7. create/retrieve/verify/delete 256K file: successful (534ms)
✅ 8. create/retrieve/verify/delete 1M file: successful (477ms)
✅ 9. create/retrieve/verify/delete 16M file: successful (1s)
✅ 10. create/retrieve/verify/delete 256M file: successful (13s)
✅ 11. create/retrieve/verify/delete 1G file: successful (51s)
✅ 12. create/retrieve/verify/delete 16G file: successful (32m 19s)
✅ 13. create/retrieve/verify/delete 256G file: successful (8h 29m 31s)
✅ 14. create/retrieve/verify/delete 1T file: successful (19h 31m 12s)
```

A separate test 1-TiB test using `cos crvd` to distinguish upload and
download times showed about 7h 7m upload, 12h 41m download, for a total of
19h 48m.

## Allowable filenames

While the vast majority of Merritt files have very ordinary filenames, 
approximately 2350 contain non-ASCII characters, of which approximately
1730 contain non-Latin characters.

We tested Minio+QF2 both against an ad-hoc list of filenames derived from
the [Big List of Naughty
Strings](https://github.com/minimaxir/big-list-of-naughty-strings), and
systematically against Unicode characters by category and property, as
well as Emoji, Emoji sequences, and invalid UTF8 sequences.

In summary, the Minio+QF2 system appears to support almost any valid Unicode
string as a key, with the following exceptions:

- the empty string
- keys containing the Unicode character NULL, `U+0000`
- keys containing the Unicode character LINE FEED, `U+000A` (newline, `\n`,
  ASCII LF)
- keys containing a backslash `\`
- keys consisting of the single character `.` (not possible in Merritt
  due to key structure)
- keys starting with `..` (not possible in Merritt due to key structure)

(Note the Minio _client_ disallows other characters, such as `^` and `*`,
that do not appear to cause problems when using the S3 API.)

As for invalid Unicode strings, in general the Minio+QF2 system appears to
disallow keys that are not valid UTF-8 byte strings. However, exactly how
these are treated may depend on the client locale and the client library
being used to access the system, and it is possible that a different client
library (e.g. in Java or Python) or one running in a different locale might
encode these differently and produce different results.

This is somewhat more restrictive than Amazon, which appears to only
disallow the empty string, `.`, and keys beginning with `..`, but still
quite permissive.

A test with the 1733 Merritt filenames containing non-Latin characters
(characters outside the Unicode Latin 1 range) revealed no issues.

### Ad-hoc file lists

For the full list of results, see [this
gist](https://gist.github.com/dmolesUC3/0d59af99d4c38f94ce8a46ebb1edac4e).
Note that the results are given as [quoted Go string
literals](https://golang.org/pkg/strconv/#Quote), so, e.g., `"\\"` represents
the single character `\` and `"\\\\"` the two-character sequence `\\`.

### Unicode

#### Unicode categories, properties, and scripts

Categories:

```
cos suite 's3://cdl.sdsc.test/' --endpoint  'https://cdl.qs3.sdsc.edu/' -v --unicode-categories

❌ 1. Unicode categories: C (166994 characters): FAILED (47m 42s)
2 invalid characters: "\x00\n"
❌ 2. Unicode categories: Cc (65 characters): FAILED (8s)
2 invalid characters: "\x00\n"
✅ 3. Unicode categories: Cf (27413 characters): successful (6m 43s)
✅ 4. Unicode categories: Co (137468 characters): successful (52m 13s)
✅ 5. Unicode categories: Cs (2048 characters): successful (24s)
✅ 6. Unicode categories: L (125093 characters): successful (27m 55s)
✅ 7. Unicode categories: Ll (2063 characters): successful (31s)
✅ 8. Unicode categories: Lm (250 characters): successful (2s)
✅ 9. Unicode categories: Lo (121047 characters): successful (28m 7s)
✅ 10. Unicode categories: Lt (31 characters): successful (443ms)
✅ 11. Unicode categories: Lu (1748 characters): successful (23s)
✅ 12. Unicode categories: M (2265 characters): successful (34s)
✅ 13. Unicode categories: Mc (401 characters): successful (6s)
✅ 14. Unicode categories: Me (13 characters): successful (517ms)
✅ 15. Unicode categories: Mn (1817 characters): successful (24s)
✅ 16. Unicode categories: N (1502 characters): successful (25s)
✅ 17. Unicode categories: Nd (590 characters): successful (8s)
✅ 18. Unicode categories: Nl (236 characters): successful (2s)
✅ 19. Unicode categories: No (676 characters): successful (10s)
❌ 20. Unicode categories: P (854 characters): FAILED (19s)
3 invalid characters: "./\\"
✅ 21. Unicode categories: Pc (10 characters): successful (485ms)
✅ 22. Unicode categories: Pd (24 characters): successful (533ms)
✅ 23. Unicode categories: Pe (73 characters): successful (673ms)
✅ 24. Unicode categories: Pf (10 characters): successful (451ms)
✅ 25. Unicode categories: Pi (12 characters): successful (448ms)
❌ 26. Unicode categories: Po (618 characters): FAILED (12s)
1 invalid characters: "\\"
✅ 27. Unicode categories: Ps (79 characters): successful (558ms)
✅ 28. Unicode categories: S (7038 characters): successful (1m 43s)
✅ 29. Unicode categories: Sc (56 characters): successful (557ms)
✅ 30. Unicode categories: Sk (171 characters): successful (1s)
✅ 31. Unicode categories: Sm (1106 characters): successful (13s)
❌ 32. Unicode categories: So (34882 characters): FAILED (7m 45s)
3 invalid characters: "\n\\\x00"
✅ 33. Unicode categories: Z (19 characters): successful (525ms)
✅ 34. Unicode categories: Zl (1 characters): successful (531ms)
✅ 35. Unicode categories: Zp (1 characters): successful (442ms)
✅ 36. Unicode categories: Zs (17 characters): successful (522ms)

```

Properties and scripts (note that this invocation of `cos suite --unicode` predates
adding the categories, Emoji, and invalid sequence cases):


```
cos suite 's3://cdl.sdsc.test/' --endpoint  'https://cdl.qs3.sdsc.edu/' -v --unicode

✅ 1. Unicode properties: ASCII_Hex_Digit (22 characters): successful (157ms)
✅ 2. Unicode properties: Bidi_Control (12 characters): successful (208ms)
✅ 3. Unicode properties: Dash (28 characters): successful (317ms)
✅ 4. Unicode properties: Deprecated (15 characters): successful (370ms)
✅ 5. Unicode properties: Diacritic (798 characters): successful (6s)
✅ 6. Unicode properties: Extender (44 characters): successful (344ms)
✅ 7. Unicode properties: Hex_Digit (44 characters): successful (292ms)
✅ 8. Unicode properties: Hyphen (11 characters): successful (324ms)
✅ 9. Unicode properties: IDS_Binary_Operator (10 characters): successful (272ms)
✅ 10. Unicode properties: IDS_Trinary_Operator (2 characters): successful (295ms)
✅ 11. Unicode properties: Ideographic (96174 characters): successful (18m 46s)
✅ 12. Unicode properties: Join_Control (2 characters): successful (367ms)
✅ 13. Unicode properties: Logical_Order_Exception (19 characters): successful (304ms)
✅ 14. Unicode properties: Other_Alphabetic (1300 characters): successful (12s)
✅ 15. Unicode properties: Other_Default_Ignorable_Code_Point (3776 characters): successful (36s)
✅ 16. Unicode properties: Other_Grapheme_Extend (125 characters): successful (910ms)
✅ 17. Unicode properties: Other_ID_Continue (12 characters): successful (225ms)
✅ 18. Unicode properties: Other_ID_Start (6 characters): successful (359ms)
✅ 19. Unicode properties: Other_Lowercase (189 characters): successful (2s)
✅ 20. Unicode properties: Other_Math (1362 characters): successful (16s)
✅ 21. Unicode properties: Other_Uppercase (120 characters): successful (888ms)
❌ 22. Unicode properties: Pattern_Syntax (2760 characters): successful (35s)
1 invalid characters: "\\"
❌ 23. Unicode properties: Pattern_White_Space (11 characters): successful (1s)
1 invalid characters: "\n"
✅ 24. Unicode properties: Prepended_Concatenation_Mark (10 characters): successful (345ms)
✅ 25. Unicode properties: Quotation_Mark (30 characters): successful (383ms)
✅ 26. Unicode properties: Radical (329 characters): successful (1s)
✅ 27. Unicode properties: Regional_Indicator (26 characters): successful (294ms)
✅ 28. Unicode properties: STerm (128 characters): successful (903ms)
✅ 29. Unicode properties: Sentence_Terminal (128 characters): successful (862ms)
✅ 30. Unicode properties: Soft_Dotted (46 characters): successful (361ms)
✅ 31. Unicode properties: Terminal_Punctuation (252 characters): successful (2s)
✅ 32. Unicode properties: Unified_Ideograph (87882 characters): successful (18m 9s)
✅ 33. Unicode properties: Variation_Selector (259 characters): successful (3s)
❌ 34. Unicode properties: White_Space (25 characters): successful (2s)
1 invalid characters: "\n"
✅ 35. Unicode scripts: Adlam (87 characters): successful (782ms)
✅ 36. Unicode scripts: Ahom (57 characters): successful (372ms)
✅ 37. Unicode scripts: Anatolian_Hieroglyphs (583 characters): successful (8s)
✅ 38. Unicode scripts: Arabic (1280 characters): successful (9s)
✅ 39. Unicode scripts: Armenian (93 characters): successful (356ms)
✅ 40. Unicode scripts: Avestan (61 characters): successful (406ms)
✅ 41. Unicode scripts: Balinese (121 characters): successful (689ms)
✅ 42. Unicode scripts: Bamum (657 characters): successful (8s)
✅ 43. Unicode scripts: Bassa_Vah (36 characters): successful (420ms)
✅ 44. Unicode scripts: Batak (56 characters): successful (281ms)
✅ 45. Unicode scripts: Bengali (95 characters): successful (817ms)
✅ 46. Unicode scripts: Bhaiksuki (97 characters): successful (941ms)
✅ 47. Unicode scripts: Bopomofo (71 characters): successful (343ms)
✅ 48. Unicode scripts: Brahmi (109 characters): successful (938ms)
✅ 49. Unicode scripts: Braille (256 characters): successful (1s)
✅ 50. Unicode scripts: Buginese (30 characters): successful (359ms)
✅ 51. Unicode scripts: Buhid (20 characters): successful (319ms)
✅ 52. Unicode scripts: Canadian_Aboriginal (710 characters): successful (8s)
✅ 53. Unicode scripts: Carian (49 characters): successful (352ms)
✅ 54. Unicode scripts: Caucasian_Albanian (53 characters): successful (351ms)
✅ 55. Unicode scripts: Chakma (67 characters): successful (877ms)
✅ 56. Unicode scripts: Cham (83 characters): successful (418ms)
✅ 57. Unicode scripts: Cherokee (172 characters): successful (1s)
❌ 58. Unicode scripts: Common (7363 characters): successful (1m 18s)
3 invalid characters: "\x00\n\\"
✅ 59. Unicode scripts: Coptic (137 characters): successful (892ms)
✅ 60. Unicode scripts: Cuneiform (1234 characters): successful (16s)
✅ 61. Unicode scripts: Cypriot (55 characters): successful (377ms)
✅ 62. Unicode scripts: Cyrillic (443 characters): successful (2s)
✅ 63. Unicode scripts: Deseret (80 characters): successful (815ms)
✅ 64. Unicode scripts: Devanagari (154 characters): successful (903ms)
✅ 65. Unicode scripts: Duployan (143 characters): successful (1s)
✅ 66. Unicode scripts: Egyptian_Hieroglyphs (1071 characters): successful (16s)
✅ 67. Unicode scripts: Elbasan (40 characters): successful (372ms)
✅ 68. Unicode scripts: Ethiopic (495 characters): successful (4s)
✅ 69. Unicode scripts: Georgian (127 characters): successful (847ms)
✅ 70. Unicode scripts: Glagolitic (132 characters): successful (856ms)
✅ 71. Unicode scripts: Gothic (27 characters): successful (310ms)
✅ 72. Unicode scripts: Grantha (85 characters): successful (964ms)
✅ 73. Unicode scripts: Greek (518 characters): successful (5s)
✅ 74. Unicode scripts: Gujarati (91 characters): successful (740ms)
✅ 75. Unicode scripts: Gurmukhi (79 characters): successful (466ms)
✅ 76. Unicode scripts: Han (89228 characters): successful (18m 35s)
✅ 77. Unicode scripts: Hangul (11739 characters): successful (2m 13s)
✅ 78. Unicode scripts: Hanunoo (21 characters): successful (395ms)
✅ 79. Unicode scripts: Hatran (26 characters): successful (328ms)
✅ 80. Unicode scripts: Hebrew (133 characters): successful (909ms)
✅ 81. Unicode scripts: Hiragana (376 characters): successful (4s)
✅ 82. Unicode scripts: Imperial_Aramaic (31 characters): successful (342ms)
✅ 83. Unicode scripts: Inherited (568 characters): successful (6s)
✅ 84. Unicode scripts: Inscriptional_Pahlavi (27 characters): successful (441ms)
✅ 85. Unicode scripts: Inscriptional_Parthian (30 characters): successful (294ms)
✅ 86. Unicode scripts: Javanese (90 characters): successful (800ms)
✅ 87. Unicode scripts: Kaithi (66 characters): successful (859ms)
✅ 88. Unicode scripts: Kannada (88 characters): successful (837ms)
✅ 89. Unicode scripts: Katakana (300 characters): successful (2s)
✅ 90. Unicode scripts: Kayah_Li (47 characters): successful (339ms)
✅ 91. Unicode scripts: Kharoshthi (65 characters): successful (816ms)
✅ 92. Unicode scripts: Khmer (146 characters): successful (888ms)
✅ 93. Unicode scripts: Khojki (62 characters): successful (347ms)
✅ 94. Unicode scripts: Khudawadi (69 characters): successful (791ms)
✅ 95. Unicode scripts: Lao (67 characters): successful (397ms)
✅ 96. Unicode scripts: Latin (1350 characters): successful (8s)
✅ 97. Unicode scripts: Lepcha (74 characters): successful (435ms)
✅ 98. Unicode scripts: Limbu (68 characters): successful (254ms)
✅ 99. Unicode scripts: Linear_A (341 characters): successful (4s)
✅ 100. Unicode scripts: Linear_B (211 characters): successful (1s)
✅ 101. Unicode scripts: Lisu (48 characters): successful (322ms)
✅ 102. Unicode scripts: Lycian (29 characters): successful (292ms)
✅ 103. Unicode scripts: Lydian (27 characters): successful (382ms)
✅ 104. Unicode scripts: Mahajani (39 characters): successful (296ms)
✅ 105. Unicode scripts: Malayalam (117 characters): successful (801ms)
✅ 106. Unicode scripts: Mandaic (29 characters): successful (336ms)
✅ 107. Unicode scripts: Manichaean (51 characters): successful (381ms)
✅ 108. Unicode scripts: Marchen (68 characters): successful (815ms)
✅ 109. Unicode scripts: Masaram_Gondi (75 characters): successful (854ms)
✅ 110. Unicode scripts: Meetei_Mayek (79 characters): successful (423ms)
✅ 111. Unicode scripts: Mende_Kikakui (213 characters): successful (1s)
✅ 112. Unicode scripts: Meroitic_Cursive (90 characters): successful (870ms)
✅ 113. Unicode scripts: Meroitic_Hieroglyphs (32 characters): successful (343ms)
✅ 114. Unicode scripts: Miao (133 characters): successful (1s)
✅ 115. Unicode scripts: Modi (79 characters): successful (1s)
✅ 116. Unicode scripts: Mongolian (166 characters): successful (1s)
✅ 117. Unicode scripts: Mro (43 characters): successful (377ms)
✅ 118. Unicode scripts: Multani (38 characters): successful (342ms)
✅ 119. Unicode scripts: Myanmar (223 characters): successful (1s)
✅ 120. Unicode scripts: Nabataean (40 characters): successful (377ms)
✅ 121. Unicode scripts: New_Tai_Lue (83 characters): successful (348ms)
✅ 122. Unicode scripts: Newa (92 characters): successful (915ms)
✅ 123. Unicode scripts: Nko (59 characters): successful (335ms)
✅ 124. Unicode scripts: Nushu (397 characters): successful (4s)
✅ 125. Unicode scripts: Ogham (29 characters): successful (367ms)
✅ 126. Unicode scripts: Ol_Chiki (48 characters): successful (321ms)
✅ 127. Unicode scripts: Old_Hungarian (108 characters): successful (737ms)
✅ 128. Unicode scripts: Old_Italic (39 characters): successful (359ms)
✅ 129. Unicode scripts: Old_North_Arabian (32 characters): successful (339ms)
✅ 130. Unicode scripts: Old_Permic (43 characters): successful (367ms)
✅ 131. Unicode scripts: Old_Persian (50 characters): successful (393ms)
✅ 132. Unicode scripts: Old_South_Arabian (32 characters): successful (335ms)
✅ 133. Unicode scripts: Old_Turkic (73 characters): successful (806ms)
✅ 134. Unicode scripts: Oriya (90 characters): successful (877ms)
✅ 135. Unicode scripts: Osage (72 characters): successful (870ms)
✅ 136. Unicode scripts: Osmanya (40 characters): successful (396ms)
✅ 137. Unicode scripts: Pahawh_Hmong (127 characters): successful (1s)
✅ 138. Unicode scripts: Palmyrene (32 characters): successful (323ms)
✅ 139. Unicode scripts: Pau_Cin_Hau (57 characters): successful (423ms)
✅ 140. Unicode scripts: Phags_Pa (56 characters): successful (382ms)
✅ 141. Unicode scripts: Phoenician (29 characters): successful (291ms)
✅ 142. Unicode scripts: Psalter_Pahlavi (29 characters): successful (318ms)
✅ 143. Unicode scripts: Rejang (37 characters): successful (364ms)
✅ 144. Unicode scripts: Runic (86 characters): successful (763ms)
✅ 145. Unicode scripts: Samaritan (61 characters): successful (356ms)
✅ 146. Unicode scripts: Saurashtra (82 characters): successful (370ms)
✅ 147. Unicode scripts: Sharada (94 characters): successful (817ms)
✅ 148. Unicode scripts: Shavian (48 characters): successful (296ms)
✅ 149. Unicode scripts: Siddham (92 characters): successful (781ms)
✅ 150. Unicode scripts: SignWriting (672 characters): successful (8s)
✅ 151. Unicode scripts: Sinhala (110 characters): successful (852ms)
✅ 152. Unicode scripts: Sora_Sompeng (35 characters): successful (318ms)
✅ 153. Unicode scripts: Soyombo (80 characters): successful (855ms)
✅ 154. Unicode scripts: Sundanese (72 characters): successful (359ms)
✅ 155. Unicode scripts: Syloti_Nagri (44 characters): successful (354ms)
✅ 156. Unicode scripts: Syriac (88 characters): successful (331ms)
✅ 157. Unicode scripts: Tagalog (20 characters): successful (346ms)
✅ 158. Unicode scripts: Tagbanwa (18 characters): successful (257ms)
✅ 159. Unicode scripts: Tai_Le (35 characters): successful (348ms)
✅ 160. Unicode scripts: Tai_Tham (127 characters): successful (818ms)
✅ 161. Unicode scripts: Tai_Viet (72 characters): successful (430ms)
✅ 162. Unicode scripts: Takri (66 characters): successful (895ms)
✅ 163. Unicode scripts: Tamil (72 characters): successful (331ms)
✅ 164. Unicode scripts: Tangut (6881 characters): successful (1m 12s)
✅ 165. Unicode scripts: Telugu (96 characters): successful (870ms)
✅ 166. Unicode scripts: Thaana (50 characters): successful (322ms)
✅ 167. Unicode scripts: Thai (86 characters): successful (830ms)
✅ 168. Unicode scripts: Tibetan (207 characters): successful (1s)
✅ 169. Unicode scripts: Tifinagh (59 characters): successful (327ms)
✅ 170. Unicode scripts: Tirhuta (82 characters): successful (1s)
✅ 171. Unicode scripts: Ugaritic (31 characters): successful (347ms)
✅ 172. Unicode scripts: Vai (300 characters): successful (1s)
✅ 173. Unicode scripts: Warang_Citi (84 characters): successful (860ms)
✅ 174. Unicode scripts: Yi (1220 characters): successful (8s)
✅ 175. Unicode scripts: Zanabazar_Square (72 characters): successful (875ms)

```

#### Emoji

```
cos suite 's3://cdl.sdsc.test/' --endpoint  'https://cdl.qs3.sdsc.edu/' -v --unicode-emoji

✅ 1. Unicode emoji properties: Emoji (1311 characters): successful (22s)
✅ 2. Unicode emoji properties: Emoji_Component (146 characters): successful (1s)
✅ 3. Unicode emoji properties: Emoji_Modifier_Base (120 characters): successful (1s)
✅ 4. Unicode emoji properties: Emoji_Presentation (1093 characters): successful (23s)
✅ 5. Unicode emoji properties: Extended_Pictographic (3793 characters): successful (51s)
✅ 6. Unicode emoji sequences: Emoji_Flag_Sequence (258 sequences): successful (10s)
✅ 7. Unicode emoji sequences: Emoji_Modifier_Sequence (570 sequences): successful (20s)
✅ 8. Unicode emoji sequences: Emoji_Tag_Sequence (3 sequences): successful (463ms)
✅ 9. Unicode emoji sequences: Emoji_ZWJ_Sequence (903 sequences): successful (47s)
```

#### UTF8 invalid sequences

```
cos suite 's3://cdl.sdsc.test/' --endpoint  'https://cdl.qs3.sdsc.edu/' -v --unicode-invalid

✅ 1. Unicode invalid characters: Non-Character (66 characters): successful (523ms)
✅ 2. Unicode invalid characters: UTF8 Invalid Bytes (11 characters): successful (443ms)
❌ 3. UTF8 invalid sequences: 1 byte (2 sequences): FAILED (306ms)
2 invalid sequences: "\xff [0xff], \x80 [0x80]"
❌ 4. UTF8 invalid sequences: 2 bytes (8 sequences): FAILED (2s)
8 invalid sequences: "\xc1\x80 [0xc1 0x80], \xe0\x80 [0xe0 0x80], \xc1\xbf [0xc1 0xbf], …"
❌ 5. UTF8 invalid sequences: 3 bytes (56 sequences): FAILED (16s)
56 invalid sequences: "ߠ\x80 [0xdf 0xa0 0x80], ߠ\xbf [0xdf 0xa0 0xbf], …"
❌ 6. UTF8 invalid sequences: 4 bytes (112 sequences): FAILED (33s)
112 invalid sequences: "\uf400\x80 [0xef 0x90 0x80 0x80], \uf400\xbf [0xef 0x90 0x80 0xbf], …"
```



