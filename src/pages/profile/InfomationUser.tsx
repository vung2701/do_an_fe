import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { concatLinkImage, convertDate, getObjFromLocal } from '../../types/utils';
import styles from './profile.module.css';
import { updateProfileUser } from '../../services';
import { useAuth } from '../../context/AuthContext';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export default function InfomationUser({
  oppen,
  memberId,
  handleFileClick,
  inputRef,
  handleFileChange,
  handleShowEdit
}: {
  oppen?: boolean;
  memberId?: any;
  handleFileClick?: any;
  inputRef?: any;
  handleFileChange?: any;
  handleShowEdit?: any;
}) {
  const { updateProfile } = useAuth();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user_id: memberId?.user_id,
      first_name: memberId?.first_name,
      last_name: memberId?.last_name,
      email: memberId?.email,
      DOB: memberId?.DOB,
      phone: memberId?.phone,
      location: memberId?.location,
      school: memberId?.school,
      major: memberId?.major
    },
    onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
      try {
        await updateProfileUser(values);
        handleShowEdit();
        updateProfile();
        resetForm();
      } catch (error) {
        console.error('Please fill all information to update profile.', error);
        toast.error('Please fill all information to update profile.');
      }
    }
  });

  return (
    <Grid container sx={{ marginBottom: '30px' }} className={styles.profileTop}>
      <Grid item xs={4}>
        <div className={styles.file}>
          <div className={styles.image}>
            <img
              src={
                memberId?.image
                  ? concatLinkImage(memberId?.image)
                  : '/public/images/user.png'
              }
              alt="user"
            />
          </div>
          {memberId && memberId.user_id == getObjFromLocal('user')?.user_id ? (
            <>
              <button
                className={styles.butonUpload}
                onClick={handleFileClick}
                type="submit"
              >
                Upload
              </button>

              <input
                className={styles.inputUpload}
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={handleFileChange}
                ref={inputRef}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </Grid>
      <Grid item xs={8}>
        <form className={styles.inforForm} onSubmit={formik.handleSubmit}>
          <div className={styles.infomation}>
            <div className={styles.fullName}>
              {oppen ? (
                <>
                  <span className={styles.f_name}>
                    <TextField
                      label="First name"
                      className={styles.titleInput}
                      variant="standard"
                      value={formik.values?.first_name || ''}
                      name="first_name"
                      onChange={formik.handleChange}
                    />
                  </span>
                  <span className={styles.f_name}>
                    <TextField
                      label="Last name"
                      className={styles.titleInput}
                      variant="standard"
                      value={formik.values.last_name || ''}
                      name="last_name"
                      onChange={formik.handleChange}
                    />
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.f_name}>{memberId?.first_name}</span>
                  <span className={styles.f_name}>{memberId?.last_name}</span>
                </>
              )}
            </div>
          </div>
          <ul className={styles.contact}>
            <li>
              <BusinessIcon />
              {oppen ? (
                <span>
                  <TextField
                    label="School"
                    className={styles.contactInput}
                    variant="standard"
                    value={formik.values.school || ''}
                    name="school"
                    onChange={formik.handleChange}
                  />
                </span>
              ) : (
                <span>{memberId?.school}</span>
              )}
            </li>
            <li>
              <BusinessCenterIcon />
              {oppen ? (
                <span>
                  <TextField
                    label="Major"
                    className={styles.contactInput}
                    variant="standard"
                    value={formik.values.major || ''}
                    name="major"
                    onChange={formik.handleChange}
                  />
                </span>
              ) : (
                <span>{memberId?.major}</span>
              )}
            </li>
            <li>
              <LocalPhoneIcon />
              {oppen ? (
                <span>
                  <TextField
                    label="Phone"
                    className={styles.contactInput}
                    variant="standard"
                    value={formik.values?.phone || ''}
                    name="phone"
                    onChange={formik.handleChange}
                    type="number"
                  />
                </span>
              ) : (
                <Link to={`tel:${memberId?.phone}`}>
                  <span>{memberId?.phone}</span>
                </Link>
              )}
            </li>
            <li>
              <LocationOnIcon />
              {oppen ? (
                <span>
                  <TextField
                    label="Location"
                    className={styles.contactInput}
                    variant="standard"
                    value={formik.values.location || ''}
                    name="location"
                    onChange={formik.handleChange}
                  />
                </span>
              ) : (
                <span>{memberId?.location}</span>
              )}
            </li>
            <li>
              <DateRangeIcon />
              {oppen ? (
                <span>
                  <TextField
                    label="Date of Birth"
                    className={styles.contactInput}
                    variant="standard"
                    value={formik.values.DOB || ''}
                    name="DOB"
                    onChange={formik.handleChange}
                    type="date"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      )
                    }}
                  />
                </span>
              ) : (
                <span>{formik.values.DOB && convertDate(formik.values.DOB)}</span>
              )}
            </li>
            <li>
              <Link className={styles.profileEmail} to={`mailto:${memberId?.email}`}>
                <EmailIcon className={styles.profileEmailIcon} />
                {oppen ? (
                  <span>
                    <TextField
                      label="Email"
                      className={styles.contactInput}
                      variant="standard"
                      disabled
                      value={formik.values.email}
                      name="email"
                      type="email"
                    />
                  </span>
                ) : (
                  <span>{memberId?.email}</span>
                )}
              </Link>
            </li>
          </ul>
          {oppen && (
            <div className={styles.saveBtn}>
              <Button variant="contained" size="small" color="success" type="submit">
                Save
              </Button>
            </div>
          )}
        </form>
      </Grid>
    </Grid>
  );
}
