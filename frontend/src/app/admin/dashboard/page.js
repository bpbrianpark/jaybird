import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardContent from "./DashboardContent";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }

    return <DashboardContent />;
}

