FROM denoland/deno:1.46.2

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

# Prefer not to run as root in production
# USER deno

# These steps will be re-run upon each file change in your working directory:
COPY . .

# For development, just initialise a long running process so we can exec into it
CMD ["deno"]
