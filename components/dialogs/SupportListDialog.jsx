import React, {
  useState, useEffect, Suspense,
} from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DOMPurify from 'dompurify';
import { deleteOrg, getOrgs } from '../../api/supportOrgApi';
import { checkUser } from '../../utils/auth';

// Lazy load the SupportOrgDialog component
const SupportOrgDialog = React.lazy(() => import('./SupportOrgDialog'));

export default function SupportOrgListDialog() {
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orgs, setOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isAddOrgDialogOpen, setIsAddOrgDialogOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOrgs = async () => {
    try {
      const data = await getOrgs();
      const sanitizedOrgs = data.map((org) => ({
        ...org,
        supportOrgName: DOMPurify.sanitize(org.supportOrgName),
        supportOrgDescription: DOMPurify.sanitize(org.supportOrgDescription),
      }));
      setOrgs(sanitizedOrgs);
    } catch (err) {
      console.error('Error fetching support orgs:', err.message);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, [fetchOrgs]);

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await checkUser();
      if (result.isLoggedIn) {
        setUserId(result.user.userId);
      }
    };

    fetchUserId();
  }, []);

  const handleOpenAddOrgDialog = () => {
    setIsAddOrgDialogOpen(true);
  };

  const handleCloseAddOrgDialog = () => {
    setIsAddOrgDialogOpen(false);
    setSelectedOrg(null);
  };

  const handleOpenListDialog = () => {
    setIsListDialogOpen(true);
  };

  const handleCloseListDialog = () => {
    setIsListDialogOpen(false);
  };

  const handleEdit = (org) => {
    setSelectedOrg(org);
    handleOpenAddOrgDialog();
  };

  const handleDelete = async (orgId) => {
    try {
      await deleteOrg(orgId);
      await fetchOrgs();
    } catch (err) {
      console.error('Error deleting support org:', err.message);
    }
  };

  const handleSaveOrg = async () => {
    await fetchOrgs();
    handleCloseAddOrgDialog();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenListDialog}>
        Open Support Orgs List
      </Button>
      <Dialog open={isListDialogOpen} onClose={handleCloseListDialog}>
        <DialogTitle>Support Organizations List</DialogTitle>
        <DialogContent>
          <List>
            {orgs.map((org) => (
              <ListItem key={org.id}>
                <ListItemText primary={org.supportOrgName} />
                <IconButton onClick={() => handleEdit(org)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(org.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseListDialog}>Close</Button>
          <Button onClick={handleOpenAddOrgDialog} color="primary">
            Add New Org
          </Button>
        </DialogActions>
      </Dialog>
      <Suspense fallback={<div>Loading...</div>}>
        <SupportOrgDialog
          existingOrg={selectedOrg}
          open={isAddOrgDialogOpen}
          onCloseDialog={handleCloseAddOrgDialog}
          userId={userId}
          onSaveOrg={handleSaveOrg}
        />
      </Suspense>
    </div>
  );
}
