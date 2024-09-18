import { Typography, Grid, Card, CardContent, Box, Link } from "@mui/material";
import { COLORS } from "../../theme";

import { blogs } from "../../utils/blogs";

const Blog = () => {
  return (
    <Box sx={{ py: 8, mb: 6, backgroundColor: COLORS.cardBackground }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Latest News & Articles
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Link
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: 3,
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.excerpt}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {article.date}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
