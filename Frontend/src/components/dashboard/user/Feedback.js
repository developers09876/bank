import React from "react";
import { useForm } from "react-hook-form";

const Feedback = ({ collapsed }) => {

     const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors },
      } = useForm();
  return (
    <div>
      <div style={{ width: "90%", marginRight: "auto", marginLeft: "auto" }}>
        <div
          className={collapsed === true ? "main-content.open" : "main-content"}
        >
            <h2>Give Your Comments</h2>
            <form onSubmit={handleSubmit()}>


            <div>
                      {/* <label className="vendorpage_labelCss">
                        Residential Address
                      </label> */}
                      <textarea
                        className="inputcolumn-ourProfile"
                        style={{ height: "60px" }}
                        name="feedback"
                        {...register("feedback", { required: true })}
                        placeholder="Feedback"
                      />
                      {errors.feedback && (
                        <p className="text-danger">Feedback is required</p>
                      )}
                    </div>
                    </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
