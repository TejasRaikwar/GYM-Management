import React from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
// import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReviewsIcon from '@mui/icons-material/Reviews';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DashboardIcon from '@mui/icons-material/Dashboard';

const SidebarData = [
    {
        title:"Dashboard",
        icon:<DashboardIcon/>,
        link:"/app"
    },
    {
        title:"Total Customers",
        icon:<GroupsIcon/>,
        link:"/app/totalcustomers"
    },
    {
        title:"New Join",
        icon:<PersonAddIcon/>,
        link:"/app/newjoin"
    },
    {
        title:"Pending Payments",
        icon:<PaymentIcon/>,
        link:"/app/pendingpayments"
    },
   
    {
        title:"Membership at End",
        icon:<NotificationsIcon/>,
        link:"/app/notifications"
    },
    {
        title:"Reviews",
        icon:<ReviewsIcon/>,
        link:"/app/reviews"
    },
    {
        title:"Suggestions",
        icon:<FeedbackIcon/>,
        link:"/app/suggestions"
    }


]
export default SidebarData