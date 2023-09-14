// importing the  images of templates
import template1 from "../images/sample1.png";
import template2 from "../images/sample2.png";
import template3 from "../images/sample3.png";
import template4 from "../images/sample4.png";

// importing all the templates
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";

//templates are  exported to process further
const templates = [
  {
    id: 1,
    template_name: "Template-1",
    template_img: template1,
    template: <Template1 />,
  },
  {
    id: 2,
    template_name: "Template-2",
    template_img: template2,
    template: <Template2 />,
  },
  {
    id: 3,
    template_name: "Template-3",
    template_img: template3,
    template: <Template3 />,
  },
  {
    id: 4,
    template_name: "Template-4",
    template_img: template4,
    template: <Template4 />,
  },
];

export { templates };
