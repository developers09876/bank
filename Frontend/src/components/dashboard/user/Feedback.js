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
    </div>
  );
};

export default Feedback;
