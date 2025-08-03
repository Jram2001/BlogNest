import { useEffect, useState } from "react";
import UserCard from "../components/user-card";
import { getOneUser } from "../services/auth-service";
import type { IUser } from "../services/auth-interface";
import BlogListing from "../components/blog-editor/blog-listing";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
    /**
     * React hook used for navigation.
     */
    const navigate = useNavigate();

    /**
     * User detail state for storing user information.
     * @type {IUser}
     */
    const [userDetails, setUserDetails] = useState<IUser>();

    /**
     * Side effect function used to load user data while mounting.
     */
    useEffect(() => {
        fetchUserDetails();
    }, []);

    /**
     * Fuction used to clear local storage and logout user.
     */
    const onButtonClick = () => {
        localStorage.clear();
        navigate('/')
    }

    /**
     * Fuction used to fetch user details from backend.
     */
    const fetchUserDetails = async () => {
        const userDetails = await getOneUser(JSON.parse('' + localStorage.getItem('userID')));
        setUserDetails(userDetails);
    }

    return (
        <div className="flex flex-wrap">
            {userDetails &&
                <UserCard username={userDetails?.data.user.username} onButtonClick={onButtonClick} buttonText="Log out" email={userDetails?.data.user.email} />
            }
            <BlogListing isProfilemode={true} userId={JSON.parse('' + localStorage.getItem('userID'))} />
        </div>
    )
}

export default Profile;
