import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function UserProfile() {
  const employee = {
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    profileImage: "", // Add a valid image URL here if available
  };

  const title = "Developer";

  const getInitials = () =>
    `${employee.firstName.charAt(0)}${employee.lastName.charAt(
      0
    )}`.toUpperCase();

  return (
    <div className="flex items-center justify-between w-full my-3">
      <div className="flex items-center">
        <Avatar className="mr-4" style={{ width: 64, height: 64 }}>
          {employee.profileImage ? (
            <AvatarImage src={employee.profileImage} alt={employee.fullName} />
          ) : (
            <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
          )}
        </Avatar>

        <div>
          <h1 className="text-gray-700 text-2xl">
            Welcome, {employee.fullName}
          </h1>
          <p className="text-gray-700">
            You are viewing the {title} Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
