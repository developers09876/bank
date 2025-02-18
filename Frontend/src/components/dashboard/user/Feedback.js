import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Api from "../../../Api";
import { ToastContainer, toast } from "react-toastify";

const Feedback = ({ collapsed }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const userid = localStorage.getItem("id");

  useEffect(() => {
    getbyUserFeedBack();
  }, []);

  const getbyUserFeedBack = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`/signup/getby/${userid}`);
      if (response.data?.userFeedback) {
        setValue("userFeedback", response.data.userFeedback); // Prefill the textarea
      }
    } catch (error) {
      console.error("Error fetching user feedback:", error);
      toast.error("Failed to fetch feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmits = async (data) => {
    setLoading(true);
    try {
      const response = await Api.put(`/signup/update/${userid}`, data);
      console.log("Update successful:", response.data);
      toast.success("Feedback submitted successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ width: "90%", marginRight: "auto", marginLeft: "auto" }}>
        <div
          className={collapsed === true ? "main-content.open" : "main-content"}
        >
          <h2>Give Your Comments</h2>
          {loading && <p>Loading...</p>}
          <form onSubmit={handleSubmit(handleSubmits)}>
            <div>
              <textarea
                className="inputcolumn-ourProfile2"
                style={{ height: "60px" }}
                name="userFeedback"
                maxLength="50" // Limit input to 50 characters
                {...register("userFeedback", { required: true })}
                placeholder="Feedback (max 50 characters)"
              />
              {errors.userFeedback && (
                <div className="text-danger">Feedback is required</div>
              )}
            </div>
            <div className="upgrade_column1 mb-3 mt-5">
              <Button
                className="button1"
                type="submit"
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />

      {/* Inline Styles for Media Queries */}
      <style jsx="true">{`
        @media (max-width: 425px) {
          .main-content {
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
          }

          .inputcolumn-ourProfile2 {
            width: 95%!important;
            height: 50px;
            font-size: 14px;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }

          .button1 {
            width: 50%!important;
            padding: 12px;
            font-size: 16px;
            border-radius: 5px;
          }

          h2 {
            font-size: 20px;
            text-align: center;
            margin-bottom: 15px;
          }

          .text-danger {
            font-size: 12px;
            text-align: center;
          }

          p {
            font-size: 14px;
            text-align: center;
            color: #888;
          }

          .upgrade_column1 {
            margin-top: 20px;
          }
        }

        @media (max-width: 375px) {
          .inputcolumn-ourProfile2 {
            height: 45px;
            font-size: 13px;
          }

          .button1 {
            font-size: 15px;
             width: 30%!important;
          }

          h2 {
            font-size: 18px;
          }
        }

        @media (max-width: 320px) {
          .main-content {
            padding: 10px;
          }

          .inputcolumn-ourProfile2 {
            font-size: 12px;
            height: 40px;
            width: 95%!important;
          }

          .button1 {
            font-size: 14px;
             width: 50%!important;
          }

          h2 {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Feedback;

