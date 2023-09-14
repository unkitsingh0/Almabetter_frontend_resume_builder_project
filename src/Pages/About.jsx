import { Stack, Typography, Box } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import { GitHub } from "@mui/icons-material";
import { Navbar } from ".";
import aboutResumeImg from "../Utils/images/aboutResume.png";

// This component represents the "About Us" page of your website.
export default function AboutUs() {
  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <Stack p={{ xs: "15px", sm: "25px", md: "40px", lg: "60px " }}>
        <h2 className="template-header-title">Resume Builder</h2>{" "}
        {/* Page title */}
        <Stack
          className="midContainer"
          direction={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          mt="20px"
        >
          <Typography
            sx={{
              fontSize: {
                xs: "13px",
                sm: "15px",
                md: "17px",
                lg: "19px",
              },
              paddingRight: {
                xs: "15px",
                sm: "18px",
                lg: "25px",
              },
              textAlign: "justify",
            }}
          >
            {/* Description of the Resume Builder */}
            Create your professional resume with ease using the free online tool
            known as Resume Builder. With a wealth of options at your
            fingertips, you can swiftly and effortlessly craft a standout resume
            that showcases your skills and qualifications. One notable feature
            is the ability to upload additional profile images, allowing you to
            personalize your resume and make a memorable first impression. After
            you've completed all the necessary fields, you have the chance to
            review your resume and ensure it meets your expectations. Once
            you're satisfied, you can download it for offline use or submission
            to potential employers. For added convenience, you can choose to
            save your resume locally on your hard drive by simply clicking the
            'Download' button. This ensures you always have easy access to your
            document, even when you're offline. Furthermore, Resume Builder
            retains your previously created resumes, making it a breeze to
            update them with new information or tailor them to different job
            applications. Unlock the power of Resume Builder and streamline your
            job search by creating professional resumes that make a lasting
            impact.
          </Typography>
          <Stack
            sx={{
              width: "30%",
              placeSelf: "center",
            }}
          >
            <img src={aboutResumeImg} alt="img" /> {/* Display an image */}
          </Stack>
        </Stack>
        <Box mt="25px">
          <Typography
            sx={{
              fontSize: {
                xs: "22px",
                sm: "25px",
                md: "27px",
                lg: "30px",
              },
              fontWeight: "400",
              color: "dark",
            }}
          >
            Kindly Share in your circle {/* Call to action */}
          </Typography>
          {/* Links to social media profiles */}
          <Box className="icons" sx={{ display: "flex" }}>
            {/* Link for Linkedin*/}
            <a
              href="https://www.linkedin.com/in/unkitsingh/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon
                sx={{ fontSize: "40px", paddingLeft: "15px" }}
                color="primary"
              />
            </a>
            {/* Link for Whatsapp*/}
            <a
              href={`https://wa.me/+919607366837?text=Hi`}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon
                sx={{ fontSize: "40px", paddingLeft: "15px" }}
                color="success"
              />
            </a>
            {/* Link for Twitter now called as X*/}
            <a
              href="https://twitter.com/unkit_singh"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon
                sx={{ fontSize: "40px", paddingLeft: "15px" }}
                color="info"
              />
            </a>
            {/* Link for Github*/}
            <a
              href="https://github.com/unkitsingh0"
              target="_blank"
              rel="noreferrer"
            >
              <GitHub
                sx={{ fontSize: "40px", paddingLeft: "15px", color: "black" }}
              />
            </a>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
