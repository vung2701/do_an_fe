import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { deleteProject, getProject } from '../../services';
import { TypeProject } from '../../types';
import DialogDelete from '../../components/dialogDelete/DialogDelete';
import DialogAdd from '../../components/dialog/dialogAdd';
import DialogUpdate from '../../components/dialogDelete/dialogUpdate';
import TitleProfile from './TitleProfile';
import styles from './profile.module.css';

const ProjectItems = ({
  description,
  name,
  id,
  onDeleteSuccess,
  userId,
  idProfile,
  project_to,
  project_from,
  userid
}: {
  name?: string;
  description?: string;
  id?: number;
  idProfile?: number;
  userId?: number;
}) => {
  const [update, setUpdate] = useState(false);
  const [deletes, setDeletes] = useState(false);

  const handleShowDetele = () => {
    setDeletes(!deletes);
  };

  const fecthDeleteProject = async () => {
    try {
      const res = await deleteProject(id);
      onDeleteSuccess();
      toast.success(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    fecthDeleteProject();
    setDeletes(!deletes);
  };

  const handleShowUpdate = () => {
    setUpdate(!update);
  };

  return (
    <Box className={styles.contentProject}>
      <img loading='lazy' src="/images/uk-flag.gif" alt="language" />
      <div className={styles.content}>
        <h6>{name}</h6>
        <span>{description}</span>
      </div>
      <div className={styles.icon}>
        {userId === idProfile ? (
          <>
            <button onClick={handleShowUpdate}>
              <CreateIcon />
            </button>
            <button onClick={handleShowDetele}>
              <ClearIcon />
            </button>
          </>
        ) : (
          ''
        )}
      </div>
      <DialogDelete
        handleClose={handleShowDetele}
        open={deletes}
        name={name}
        handleDelete={handleDelete}
      />
      <DialogUpdate
        handleClose={handleShowUpdate}
        open={update}
        name={name}
        id={id}
        description={description}
        project_to={project_to}
        project_from={project_from}
        userid={userid}
        onDeleteSuccess={onDeleteSuccess}
      />
    </Box>
  );
};

export default function Projects({
  user,
  idProfile,
  userId
}: {
  user?: number;
  idProfile?: number;
  userId?: number;
}) {
  const [project, setProject] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const { profile } = useAuth();

  const fecthProject = async () => {
    try {
      const data = await getProject(user);
      setProject(data.project);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fecthProject();
    }
  }, [user]);

  const handleShowUpdate = () => {
    setShowAdd(!showAdd);
  };

  return (
    <Box sx={{ marginBottom: '30px' }} className={styles.projects}>
      <TitleProfile title="Projects" onClick={handleShowUpdate} />
      {project.length <= 0 ? (
        <p className={styles.noProject}>No projects</p>
      ) : (
        project.map((project: TypeProject) => {
          return (
            <ProjectItems
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              project_to={project?.project_to}
              project_from={project?.project_from}
              onDeleteSuccess={fecthProject}
              userId={userId}
              idProfile={idProfile}
              userid={profile?.user}
            />
          );
        })
      )}
      <DialogAdd
        handleClose={handleShowUpdate}
        showAdd={showAdd}
        userid={profile?.user}
        setShowAdd={setShowAdd}
        onDeleteSuccess={fecthProject}
      />
    </Box>
  );
}
