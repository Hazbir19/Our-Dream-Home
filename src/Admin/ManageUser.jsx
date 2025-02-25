import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import UseSecureApi from "../Custom/UseSecureApi";
import { GrUserAdmin } from "react-icons/gr";
import { MdRealEstateAgent } from "react-icons/md";
import { RiShieldCrossLine, RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUser = () => {
  const SecureApi = UseSecureApi();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const user = await SecureApi.get("/users");
      return user.data;
    },
  });
  const HandleDeleteUser = (user) => {
    // Delete user logic here
    Swal.fire({
      title: "Are you sure?",
      text: `You Want Delete this User ${user.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        SecureApi.delete(`/users/${user._id}`);
        if (result.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `Your ${user.name} has been deleted.`,
            icon: "success",
          });
        }
      }
    });
  };
  const handleMakeAdmin = (user) => {
    console.log("click");
    // Make admin logic here
    SecureApi.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} has been Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleMakeAgent = (user) => {
    console.log("click");
    // Make admin logic here
    SecureApi.patch(`/users/agent/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} has been Agent`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Manage Users ({users.length})
      </h1>

      <div className="min-w-max">
        <table className="table lg:w-full border border-gray-300">
          <thead className="bg-gray-800 text-white text-sm sm:text-base">
            <tr>
              <th className="p-2">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Make Admin</th>
              <th className="p-3">Make Agent</th>
              <th className="p-3">Mark as Fraud</th>
              <th className="p-3">Delete User</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 text-sm sm:text-base">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                {/* User Name & Avatar */}
                <td>{index + 1}</td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="font-semibold">{user.name}</div>
                  </div>
                </td>

                <td className="p-3">{user.email}</td>

                <td className="p-3 text-center">
                  {user.role == "admin" ? (
                    <>
                      <div>
                        <h1 className="text-lg w-1/2 bg-pink-400 text-white shadow-md">
                          Admin
                        </h1>
                      </div>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary flex items-center gap-2"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <GrUserAdmin className="text-lg" />
                      Admin
                    </button>
                  )}
                </td>

                {/* Make Agent */}
                <td className="p-3 text-center">
                  {user.role == "agent" ? (
                    <>
                      <div>
                        <h1 className="text-lg w-1/2 bg-purple-400 text-white shadow-md">
                          Agent
                        </h1>
                      </div>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary flex items-center gap-2"
                      onClick={() => handleMakeAgent(user)}
                    >
                      <GrUserAdmin className="text-lg" />
                      Agent
                    </button>
                  )}
                </td>

                {/* Mark as Fraud */}
                <td className="p-3 text-center">
                  <button className="btn btn-warning flex items-center gap-2">
                    <RiShieldCrossLine className="text-lg" />
                    Fraud
                  </button>
                </td>

                {/* Delete User */}
                <td className="p-3 text-center">
                  <button
                    className="btn btn-error flex items-center gap-2"
                    onClick={() => HandleDeleteUser(user)}
                  >
                    <RiDeleteBin6Line className="text-lg" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
