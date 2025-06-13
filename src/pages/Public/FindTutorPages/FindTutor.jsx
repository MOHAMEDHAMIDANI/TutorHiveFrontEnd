import React, { useEffect, useState } from "react";
import TopBar from "../../../components/TopBar";
import FilterCourse from "../../../components/FilterCourse";
import banner from "../../../assets/FindBanner.png";
import Footer from "../../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { Spin } from "antd";

const FindTutor = () => {
    const navigate = useNavigate();
    const { state = null } = useLocation(); // Get filters from state
    const [tutors, setTutors] = useState([]); // All tutors
    const [filteredTutors, setFilteredTutors] = useState([]); // Filtered tutors
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTutors = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(
                `users/?filters=${encodeURIComponent(
                    JSON.stringify({ roles: [{ id: 3 }] })
                )}`
            );
            if (response.status === 200) {
                setTutors(response.data.data); // Set all tutors
                setFilteredTutors(response.data.data); // Initialize filtered tutors
            }
        } catch (error) {
            console.error("Error fetching tutors:", error);
            setError("Failed to fetch tutors. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const applyFilters = (filters) => {
        console.log("Filters applied:", filters); // Log filters
        console.log("All tutors before filtering:", tutors); // Log all tutors
    
        const filtered = tutors.filter((tutor) => {
            console.log("Checking tutor:", tutor); // Log each tutor being checked
    
            // Filter by availableDays
            if (filters.filters?.availableDays?.length) {
                const tutorAvailableDays = tutor.availableDays.map((day) => day.day.toLowerCase());
                const filterAvailableDays = filters.filters?.availableDays.map((day) => day.toLowerCase());
    
                if (!filterAvailableDays.some((day) => tutorAvailableDays.includes(day))) {
                    console.log("Filtered out by availableDays");
                    return false;
                }
            }
    
            // Filter by gradeLevels
            if (filters.filters?.gradeLevels?.length) {
                const tutorGradeLevels = tutor.gradeLevels.map((level) => level.toLowerCase());
                const filterGradeLevels = filters.filters?.gradeLevels.map((level) => level.toLowerCase());
    
                if (!filterGradeLevels.some((level) => tutorGradeLevels.includes(level))) {
                    console.log("Filtered out by gradeLevels");
                    return false;
                }
            }
    
            // Filter by hourlyRate
            if (filters.filters?.hourlyRate) {
                if (tutor.hourlyRate > filters.filters?.hourlyRate) {
                    console.log("Filtered out by hourlyRate");
                    return false;
                }
            }
    
            // Filter by subjects
            if (filters.filters?.subjects?.length) {
                const tutorSubjects = tutor.subjects.map((subject) => subject.toLowerCase());
                const filterSubjects = filters.filters?.subjects.map((subject) => subject.toLowerCase());
    
                if (!filterSubjects.some((subject) => tutorSubjects.includes(subject))) {
                    console.log("Filtered out by subjects");
                    return false;
                }
            }
    
            // Filter by tags
            if (filters.filters?.tags?.length) {
                const tutorTags = tutor.tags.map((tag) => tag.toLowerCase());
                const filterTags = filters.filters?.tags.map((tag) => tag.toLowerCase());
    
                if (!filterTags.some((tag) => tutorTags.includes(tag))) {
                    console.log("Filtered out by tags");
                    return false;
                }
            }
    
            // Filter by unavailableDates
            if (filters.filters?.unavailableDates?.length) {
                const tutorUnavailableDates = tutor.unavailableDates.map((date) => date.date);
                const filterUnavailableDates = filters.filters?.unavailableDates;
    
                if (filterUnavailableDates.some((date) => tutorUnavailableDates.includes(date))) {
                    console.log("Filtered out by unavailableDates");
                    return false;
                }
            }
    
            // Filter by minRating
            if (filters.filters?.minRating) {
                const reviews = tutor.reviews_for_me;
    
                if (reviews.length) {
                    const avgRating =
                        reviews.reduce((acc, review) => {
                            return (
                                acc +
                                (Number(review.knowledgeAndExpertise) +
                                    Number(review.communicationSkills) +
                                    Number(review.preparednessAndOrganization) +
                                    Number(review.reliabilityAndPunctuality) +
                                    Number(review.professionalism)) /
                                    5
                            );
                        }, 0) / reviews.length;
    
                    if (avgRating < filters.filters?.minRating) {
                        console.log("Filtered out by minRating");
                        return false;
                    }
                } else {
                    // Exclude tutors with no reviews
                    console.log("Filtered out due to no reviews for minRating filter");
                    return false;
                }
            }
    
            // Filter by locationType
            if (filters.filters?.locationType) {
                if (tutor.locationType && tutor.locationType.toLowerCase() !== filters.filters.locationType.toLowerCase()) {
                    console.log("Filtered out by locationType");
                    return false;
                }
            }
    
            // Filter by searchQuery
            if (filters.filters?.searchQuery) {
                const query = filters.filters.searchQuery.toLowerCase();
    
                if (
                    !(
                        tutor.firstName.toLowerCase().includes(query) ||
                        tutor.lastName.toLowerCase().includes(query) ||
                        tutor.email.toLowerCase().includes(query) ||
                        (tutor.description && tutor.description.toLowerCase().includes(query))
                    )
                ) {
                    console.log("Filtered out by searchQuery");
                    return false;
                }
            }
    
            // If all filters pass, include the tutor
            return true;
        });
    
        console.log("Filtered tutors:", filtered); // Log filtered tutors
        setFilteredTutors(filtered);
    };
    
    
    

    useEffect(() => {
        getTutors(); // Fetch tutors on mount
    }, []);

    useEffect(() => {
        if (state?.filters) {
            console.log("State Filters:", state.filters);
            applyFilters(state.filters);  
        }
    }, [state?.filters, tutors]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="bg-gray-100">
            <div className="pb-20">
                <TopBar />
            </div>

            {/* Hero Banner */}
            <div
                style={{
                    background: "linear-gradient(to bottom, #7db9e8, #d0e7ff)",
                }}
                className="lg:max-w-[1501px] m-auto rounded-xl relative"
            >
                <div
                    style={{ backgroundImage: `url(${banner})` }}
                    className="p-10 max-md:p-4 bg-cover bg-center rounded-xl "
                >
                    <div>
                        <div className="flex justify-center items-center lg:min-h-[518px] max-md:min-h-[300px]">
                            <div>
                                <h1 className="text-[48px] max-md:text-[34px] text-center">
                                    Find Your Ideal Tutor for
                                </h1>
                                <h1 className="font-bold text-black text-[48px] max-md:text-[34px] text-center">
                                    Personalized Learning
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Course */}
            <div className="-mt-[8rem] max-md:mt-4 relative z-30 lg:max-w-[1350px] m-auto">
                <FilterCourse
                    handleSubmit={(filters) => applyFilters(filters)}
                    findTutor={true}
                />
            </div>

            {/* Tutor List */}
            <section>
                <div className="lg:max-w-[1250px] m-auto py-20">
                    {error && (
                        <div className="text-red-500 text-center text-lg">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 gap-6 mt-10">
                        {filteredTutors.map((item, index) => (
                            <div
                                key={index}
                                className="relative rounded-xl h-[374px] overflow-hidden group cursor-pointer"
                                onClick={() =>
                                    navigate(`service/?tutor=${item.id}`)
                                }
                            >
                                <div
                                    style={{
                                        backgroundImage: `url(${item?.photo?.path})`,
                                    }}
                                    className="p-10 bg-cover bg-center h-full w-full transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                                >
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                "linear-gradient(179deg, rgba(58, 58, 58, 0.10) 0.92%, #000 99.03%)",
                                        }}
                                    ></div>
                                    <div className="relative -left-6 flex flex-col justify-end h-full">
                                        <h1 className="text-[24px] text-white font-[700]">
                                            {item.firstName} {item.lastName}
                                        </h1>
                                        <h1
                                            style={{
                                                backgroundColor:
                                                    "rgba(96, 199, 246, 0.19)",
                                            }}
                                            className="text-primary1 px-4 relative -left-2 top-2 mx-auto rounded-[49px]"
                                        >
                                            {item.experience}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FindTutor;
