import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="signup-container">
            <div className="sign-up">
                <SignUp />
            </div>
        </div>
    );
}
