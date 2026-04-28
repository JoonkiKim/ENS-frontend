import AlumniSearch from "../../src/components/commons/units/findAlumni/findAlumni.container";
import AuthGate from "../../src/commons/hooks/authGate";

export default function FindAlumniPage() {
  return (
    <AuthGate>
      <AlumniSearch />
    </AuthGate>
  );
}
