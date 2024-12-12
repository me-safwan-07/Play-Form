import React, { useEffect, useState } from 'react';

// Define the type for the user data
interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  identityProvider: string;
}

const UserTable: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/675a4e750752d1b885981ebe');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json();
        setUserData(data);
      } catch (err) {
        if(err instanceof Error) {
            setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Details</h1>
      {userData && (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Field</th>
              <th className="border border-gray-300 px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">ID</td>
              <td className="border border-gray-300 px-4 py-2">{userData.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Name</td>
              <td className="border border-gray-300 px-4 py-2">{userData.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Email</td>
              <td className="border border-gray-300 px-4 py-2">{userData.email}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Email Verified</td>
              <td className="border border-gray-300 px-4 py-2">{userData.emailVerified || 'Not Verified'}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Image URL</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={userData.imageUrl}
                  alt={userData.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Created At</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(userData.createdAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Updated At</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(userData.updatedAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Identity Provider</td>
              <td className="border border-gray-300 px-4 py-2">{userData.identityProvider}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
