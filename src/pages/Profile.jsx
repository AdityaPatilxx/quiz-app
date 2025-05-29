import ProfileForm from "../components/auth/ProfileForm";
import RequireAuth from "../components/auth/RequireAuth";

export default function Profile() {
  return (
    <RequireAuth>
      <div className="max-w-4xl mx-auto py-8">
        <ProfileForm />
      </div>
    </RequireAuth>
  );
}
