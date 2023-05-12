import { GitHubBanner, Refine, ErrorComponent } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";

import { PostCreate, PostEdit, PostList } from "pages/posts";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                        edit: "/posts/edit/:id",
                    },
                ]}
                options={{
                    mutationMode: "pessimistic",
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route
                        index
                        element={<NavigateToResource resource="posts" />}
                    />

                    <Route path="/posts">
                        <Route index element={<PostList />} />
                        <Route path="create" element={<PostCreate />} />
                        <Route path="edit/:id" element={<PostEdit />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
