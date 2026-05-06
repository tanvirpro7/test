# Security Specification - Phulpur Hub

## Data Invariants
1. A user can only edit their own profile.
2. Only admins can approve or reject businesses.
3. Users can submit new businesses, which start in 'pending' status.
4. Jobs and News are publicly readable but only editable by admins.
5. Applications are only readable by the applicant and admins.

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Attempt to update another user's profile role to 'admin'.
2. **Identity Spoofing**: Attempt to create a user profile with a different UID than `request.auth.uid`.
3. **Privilege Escalation**: Attempt to update own status to 'approved' for a business submission without admin rights.
4. **Data Tampering**: Attempt to change the `createdAt` timestamp of a document after creation.
5. **Unauthorized Write**: Attempt to delete a public news article as a regular user.
6. **Information Disclosure**: Attempt to read another user's job application.
7. **Resource Poisoning**: Attempt to inject a 2MB string into a business description.
8. **Shadow Field**: Attempt to add an `isVerified: true` field to a user profile that isn't in the schema.
9. **Update Gap**: Attempt to update only the `rating` field of a business without owner permissions.
10. **State Shortcut**: Attempt to move an application from 'pending' directly to 'accepted' by the applicant.
11. **PII Leak**: Attempt to list all user emails by querying the `/users` collection without being an admin.
12. **Orphaned Write**: Attempt to create a job application for a non-existent `jobId`.

## Test Runner (firestore.rules.test.ts)
(Will be implemented if requested, focusing on rules first)
