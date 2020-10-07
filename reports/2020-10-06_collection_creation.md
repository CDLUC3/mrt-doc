### Collection creation steps and potential UI
This page documents steps needed to create a new collection in Merritt, and groups them into sets of procedures that could be part of a web form-based UX.

- The precursor information needed to begin these procedures is collection documentation. e.g. https://docs.google.com/document/d/1qBpwJRp2Fi7v72XUAlmVwBCEUETdX1HbX2xS04yPPPc/edit?usp=sharing

- And a collection ARK, which is obtained by logging into EZID via the Merritt user and generating a new Merritt Collection identifier.

#### Form page 1: Obtain Collection ARK from EZID, and enter Collection profile and Input profile information
Most of the information in the Collection profile will carry over to the Input profile.
###### Section 1, EZID:
- Present a button that triggers obtaining an ARK from EZID. It returns an ARK for copy/pasting into the subsequent collection profile section (or could pre-populated the corresponding field there).
- This form should also set properties for the created ID, including collection Status to Unavailable, and the Harvesting option to No.
###### Section 2 for Collection profile:
- Environment: Choose Production or Stage from a drop down menu
- Collection mnemonic
- Collection description: Free text field
- Collection ARK
- Collection owner ARK
- Admin notification email addresses: Merritt team email addresses, comma-delineated
- Primary Storage node: e.g 9501
- Creation Date and Modification Date (dynamically generated on form submission)
###### Section 3 for Input profile:
- End user notification email addresses: End/campus user email addresses 

Completing and triggering the form via a button results in two blocks of text: one for the Collection profile, and the other an Input profile. Initially, it will be up to the user to check in Collection and Input profile files to github using this text. At a later stage in development, it would be ideal to have the form trigger check-in.

#### Form page 2: Generate LDAP entries for collection
This second form will be used to generate LDAP entries. It should contain text entry fields for the following:
- arkId
- ou
- description
- submissionProfile
Submitting this form should also generate corresponding ObjectClass entries for: 
- merrittClass
- organizationalUnit
- top
And new groupOfUniqueNames entries for permissions groups
- read
- write
- download 
- admin

#### Form page 3: Submit initial collection object
This third form should submit an initial object to generate a collection entry in the database (inv_collections). 
More information is needed for this step, but I assume a mrt-delete.txt file is used, and the collection's primary identifier (ARK) is used. If that's the case, then a field should be presented for ARK entry.

#### Form page 4: 
The fourth form should enable updating database entries for the collection. A series of fields should be presented to enter the following information in the inv_collections table:
- `name`
- `mnemonic`
- `read_privilege = restricted`
- `write_privilege = restricted`
- `download_privilege = restricted`
- `storage_tier = standard`
Two additional drop-down menus should be presented to specify secondary storage nodes in `inv_collections_inv_nodes` with choices for:
- Wasabi
- S3
- Dryad
- Glacier
Submission of this form should likely execute POST requests to correspoding API endpoints that will update the Inventory database.

Once all form pages have been submitted, a user should then add users to the permissions groups in LDAP and log in to view the new collection.

