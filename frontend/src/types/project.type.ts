export type Project = {
  _id?: string;
  name: string;
  description: string;
  tools?: string | string[];
  image?: string;
  link: string;
};

export type UpdateProjectPayload = {
  projectId: string;
  data: Project;
};
