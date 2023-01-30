import React from "react";

function MiddleVsAdvanced() {
    return (
        <div>
            <div className="text-4xl font-bold">Examples of Basic vs Advanced words</div>
            <table className="mt-6 table-auto min-w-full border text-center">
                <thead className="border-b">
                <tr>
                    <th scope="col" className="text-md font-medium px-6 py-4 border-r">Basic</th>
                    <th scope="col" className="text-md font-medium px-6 py-4 border-r">Advanced</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b">
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">house, book, chair, table
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">mansion, novel, recliner,
                        board
                    </td>
                </tr>
                <tr className="border-b">
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">orange, apple</td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">tangerine, Granny Smith</td>
                </tr>
                <tr className="border-b">
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">dog, cat</td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">chihuahua, Maine coon</td>
                </tr>
                <tr className="border-b">
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">thing, fact</td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">artifact, evidence</td>
                </tr>
                <tr className="border-b">
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">justice, fun</td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">reprisal, amusement</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MiddleVsAdvanced;