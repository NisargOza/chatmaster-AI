import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="signup-container">
            <div className="sign-in-form">
                <SignIn />
            </div>
        </div>
    );
}
