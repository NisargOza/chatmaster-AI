import Options from "./components/Options";
import { SignUp } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <Options />
      <div className="signup-container">
        <div className="sign-up-form">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
