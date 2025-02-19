import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../user/MyProfile.scss";
import Api from "../../../Api";
import { toast, ToastContainer } from "react-toastify";

function Subscription() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [fetchedData, setfetchedData] = useState([]);

  const onSubmit = async (data) => {
    const details = {
      subsriptionPrice: data.subsriptionPrice,
      offerPrice: data.offerPrice,
    };
    try {
      if (fetchedData.length > 0) {
        const putresponse = await Api.put(
          `/subscription/update/${fetchedData[0]._id}`,
          details
        );
        console.log("firstresponse", putresponse);
        toast.success("Price updated successfully");
      } else {
        const response = await Api.post(
          "/subscription/createSubscription",
          details
        );
        console.log("response.data", response.data.data);
        toast.success("Price created successfully");
      }
      await fetchSubscriptionPlan();
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchSubscriptionPlan = async () => {
    try {
      const response = await Api.get("/subscription/getall");
      setfetchedData(response.data);
      reset(response.data[0]);
      console.log("fetchedData", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchSubscriptionPlan();
  }, [reset]);

  return (
    <div style={{ width: "100%" }}>
      <Container style={{ marginTop: "6%", width: "90%" }}>
        <div style={{ width: "100%" }}>
          <h4
            style={{
              textAlign: "center",
              color: "#00397f",
              marginTop: "15px",
            }}
          >
            <b>Subscription Price</b>
          </h4>
          <br />
          <div style={{ justifyContent: "space-between" }}>
            <form>
              <Row className="px-2 py-2">
                <Col className="px-1 py-2">
                  <label className="vendorpage_labelCss">Price</label>
                  {/* <br /> */}
                  <input
                    type="number"
                    className="inputcolumn-ourProfile"
                    placeholder="Enter Price"
                    name="subsriptionPrice"
                    {...register("subsriptionPrice", { required: true })}
                  />
                  {errors.subsriptionPrice && (
                    <p className="text-danger">
                      Subscription Price is required
                    </p>
                  )}
                </Col>
                <Col className="px-1 py-2">
                  <label className="vendorpage_labelCss">Offer price</label>
                  <input
                    type="number"
                    className="inputcolumn-ourProfile"
                    placeholder="Enter Offer Price"
                    name="offerPrice"
                    {...register("offerPrice", { required: true })}
                  />
                  {errors.offerPrice && (
                    <p className="text-danger">OfferPrice is required</p>
                  )}
                </Col>
              </Row>
              <Row>
                <div
                  className="upgrade_column mb-3"
                  style={{ flexDirection: "unset" }}
                >
                  <Button
                    className="button1 mx-2"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    style={{ backgroundColor: "#00397f", color: "white" }}
                  >
                    Submit
                  </Button>
                  <Button
                    className="button1 mx-2"
                    // type="button"
                    variant="secondary"
                    onClick={() => reset()}
                    // style={{ backgroundColor: '#d9534f', color: 'white' }}
                  >
                    Reset
                  </Button>
                </div>
              </Row>
            </form>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default Subscription;
