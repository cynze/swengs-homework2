from django.db import models


class Series(models.Model):
    title_series = models.TextField()
    start_year = models.IntegerField(null=True)
    end_year = models.IntegerField(null=True)
    producer = models.TextField()
    style = models.TextField()

    def __str__(self):
        return self.title_series


class Author(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    birthday = models.DateField()

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    alive = models.BooleanField()

    def __str__(self):
        return '%s %s (%s)' % (self.first_name, self.last_name, self.birthday)


class Episode(models.Model):
    CHOICES = (
        ('a', 'Action'),
        ('c', 'Comedy'),
        ('r', 'Romance'),
        ('t', 'Thriller')
    )

    title_episode = models.TextField()
    release_date = models.DateField()
    season = models.IntegerField()
    black_and_white = models.BooleanField(null=True)
    genre = models.CharField(max_length=1, choices=CHOICES, null=True)
    rate = models.PositiveIntegerField(null=True)
    series = models.ForeignKey(Series, on_delete=models.CASCADE)
    author = models.ManyToManyField(Author, related_name='author', blank=True)

    def __str__(self):
        return self.title_episode
