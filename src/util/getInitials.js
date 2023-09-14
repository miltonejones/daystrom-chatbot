export default function getInitials(fullName) {
  if (!fullName) return "";
  const namesArray = fullName.split(" ");
  const initials = namesArray.map((name) => name.charAt(0)).join("");
  return initials.toUpperCase();
}
