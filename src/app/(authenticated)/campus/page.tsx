import { Campus, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Campus[]> {
    // Fetch data from your API here.
    return [
        { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
        { id: "1a2b3c4d", amount: 250, status: "completed", email: "john@example.com" },
        { id: "9f8e7d6c", amount: 75, status: "failed", email: "sarah@example.com" },
        { id: "aa11bb22", amount: 320, status: "pending", email: "paul@example.com" },
        { id: "cc33dd44", amount: 150, status: "completed", email: "kate@example.com" },
        { id: "ee55ff66", amount: 980, status: "pending", email: "emma@example.com" },
        { id: "1122aabb", amount: 540, status: "completed", email: "daniel@example.com" },
        { id: "3344ccdd", amount: 410, status: "failed", email: "chris@example.com" },
        { id: "5566eeff", amount: 280, status: "pending", email: "tina@example.com" },
        { id: "77889900", amount: 690, status: "completed", email: "austin@example.com" },

        { id: "f1e2d3c4", amount: 215, status: "pending", email: "brian@example.com" },
        { id: "c4d3e2f1", amount: 380, status: "completed", email: "ivy@example.com" },
        { id: "abcd1234", amount: 630, status: "failed", email: "lisa@example.com" },
        { id: "1234abcd", amount: 105, status: "pending", email: "mark@example.com" },
        { id: "45ef67gh", amount: 850, status: "completed", email: "zoe@example.com" },
        { id: "67gh89ij", amount: 95, status: "pending", email: "nancy@example.com" },
        { id: "89ij01kl", amount: 720, status: "failed", email: "frank@example.com" },
        { id: "01kl23mn", amount: 560, status: "completed", email: "carry@example.com" },
        { id: "23mn45op", amount: 330, status: "pending", email: "steve@example.com" },
        { id: "45op67qr", amount: 205, status: "completed", email: "olivia@example.com" },

        { id: "qr89st23", amount: 475, status: "pending", email: "anna@example.com" },
        { id: "st23uv56", amount: 710, status: "completed", email: "henry@example.com" },
        { id: "uv56wx89", amount: 630, status: "failed", email: "bella@example.com" },
        { id: "wx89yz12", amount: 90, status: "pending", email: "matthew@example.com" },
        { id: "yz12ab34", amount: 1280, status: "completed", email: "rebecca@example.com" },
        { id: "ab34cd56", amount: 168, status: "failed", email: "albert@example.com" },
        { id: "cd56ef78", amount: 720, status: "pending", email: "glory@example.com" },
        { id: "ef78gh90", amount: 405, status: "completed", email: "simon@example.com" },
        { id: "gh90ij12", amount: 515, status: "failed", email: "angela@example.com" },
        { id: "ij12kl34", amount: 305, status: "pending", email: "victor@example.com" },

        { id: "kl34mn56", amount: 275, status: "completed", email: "queen@example.com" },
        { id: "mn56op78", amount: 1500, status: "pending", email: "patrick@example.com" },
        { id: "op78qr90", amount: 820, status: "completed", email: "mercy@example.com" },
        { id: "qr90st12", amount: 640, status: "failed", email: "sam@example.com" },
        { id: "st12uv34", amount: 315, status: "pending", email: "stella@example.com" },
        { id: "uv34wx56", amount: 975, status: "completed", email: "jonathan@example.com" },
        { id: "wx56yz78", amount: 415, status: "failed", email: "gladys@example.com" },
        { id: "yz78ab90", amount: 260, status: "pending", email: "tim@example.com" },
        { id: "ab90cd12", amount: 820, status: "completed", email: "wendy@example.com" },
        { id: "cd12ef34", amount: 540, status: "pending", email: "michael@example.com" },

        { id: "ef34gh56", amount: 400, status: "completed", email: "ella@example.com" },
        { id: "gh56ij78", amount: 225, status: "failed", email: "judah@example.com" },
        { id: "ij78kl90", amount: 1180, status: "pending", email: "sandra@example.com" },
        { id: "kl90mn12", amount: 320, status: "completed", email: "charles@example.com" },
        { id: "mn12op34", amount: 640, status: "pending", email: "tolu@example.com" },
        { id: "op34qr56", amount: 295, status: "failed", email: "emma2@example.com" },
        { id: "qr56st78", amount: 880, status: "completed", email: "david@example.com" },
        { id: "st78uv90", amount: 505, status: "pending", email: "hannah@example.com" },
    ];

}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto px-4 py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}