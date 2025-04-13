rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /referrals/{docId} {
      allow read: if true;
      allow write: if request.time < timestamp.date(2024, 4, 29);
    }
  }
}
