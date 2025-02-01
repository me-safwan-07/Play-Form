import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export interface PageHeaderProps {
  pageTitle?: string;
  cta?: React.ReactNode;
  children?: React.ReactNode;
}
const logoHref = 'https://images.squarespace-cdn.com/content/v1/5fdc74917b9f8c700eea8da4/1610350178950-RBIUS0982X23B4RRCAKF/LOGO.png?format=1500w'
const profileImage = 'https://avatars.githubusercontent.com/u/167682973?v=4'

export const PageHeader = ({ cta, children }: PageHeaderProps) => {
  const navigate = useNavigate();
  const { environmentId } = useParams();
  return (
    <div className="border-b sticky top-0 bg-background z-10">
      <div className="container flex items-center justify-between h-16  space-x-4 pb-4">
        <Link to={`/environments/${environmentId}/forms`}>
          <img src={logoHref} alt="Logo" className="text-sm h-8 sm:inline " />
        </Link>
        {/* {cta} */}
        <div className="flex items-center">
          <Avatar
            onClick={() => navigate(`/environments/${environmentId}/profile`)}
            className='cursor-pointer'
          >
            <AvatarImage src={profileImage} alt="Profile"  className="w-10 h-10 rounded-full"/>
            <AvatarFallback>
              <span className='text-xl'>MS</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      {children}
    </div>
  );
};