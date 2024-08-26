import { ApiClient } from '../baseRqeuest';

const getAppliedJobs = ({
  page,
  page_size,
  orderBy,
  searchValue,
  dateRange,
  signal,
}) =>
  ApiClient.get(
    `job-apply/jobs/?page=${page}&page_size=${page_size}&ordering=${orderBy}&search=${searchValue}&created_at__gte=${dateRange.created_at__gte}&created_at__lte=${dateRange.created_at__lte}`,
    { signal },
  );

const changeDefaultResume = (id) =>
  ApiClient.patch(`user/change-default-resume/${id}/`);

export const JobApplyingApi = {
  getAppliedJobs,
  changeDefaultResume,
};
