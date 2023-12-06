import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import logo from "../../images/logo.png";
import "./SideBar.css"
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={"/"}>
        <img src={logo} alt="e-commerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to={"/admin/dashboard"}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/Products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/Add/Products">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
            <Link to="/admin/Categories">
              <TreeItem nodeId="4" label="Cateogry" icon={<CategoryIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to={"/admin/orders"}>
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to={"/admin/Users"}>
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to={"/admin/Product/review"}>
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default SideBar;
