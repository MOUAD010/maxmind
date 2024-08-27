import axios from "axios";
import { useState, useEffect, useRef } from "react";
import PostDisplay from "./PostDisplay";
import html2canvas from "html2canvas";
import { FaCloudDownloadAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import Skeleton from "./Skeleton";
type PostProps = {
  post_id: string;
  since: string;
  until: string;
};

const Post = ({ post_id, since, until }: PostProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = componentRef.current;

    if (element) {
      // Ensure all images are loaded
      const images = Array.from(element.querySelectorAll("img"));
      const loadPromises = images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      );

      await Promise.all(loadPromises);

      const canvas = await html2canvas(element, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
    }
  };

  const [posData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const payload = {
      limit: "10",
      offset: "0",
      since: since,
      until: until,
    };
    const getDataPosts = async () => {
      try {
        setIsLoading(true); // Set loading to true when fetching starts
        const response = await axios.post(
          `https://meta-api-eight.vercel.app/api/v1/page/${post_id}/feeds`,
          payload
        );

        console.log(response.data.data.data);
        setPostData(response.data.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false when fetching ends
      }
    };

    getDataPosts();
  }, [post_id, since, until]);

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full ">
      <button
        onClick={handleDownloadPdf}
        className=" flex justify-center items-center gap-2 bg-green-700 p-2 rounded-lg text-white hover:bg-green-900"
      >
        <FaCloudDownloadAlt color="white" size={25} />
        Download as PDF
      </button>
      <div ref={componentRef}>
        {isLoading ? (
          <Skeleton />
        ) : (
          posData.map((item: any) => (
            <div key={item.id}>
              <PostDisplay item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
